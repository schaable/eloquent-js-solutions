import { createServer } from 'http';
import { writeFileSync } from 'fs';
import handler from 'serve-handler';
import { v4 as uuidv4 } from 'uuid';
import Router from './router.js';
import database from './db.json' assert { type: 'json' };

var router = new Router();
var defaultHeaders = { 'Content-Type': 'text/plain' };

var SkillShareServer = class SkillShareServer {
  constructor(talks) {
    this.talks = talks;
    this.version = 0;
    this.waiting = [];

    this.server = createServer((request, response) => {
      let resolved = router.resolve(this, request);
      if (resolved) {
        resolved
          .catch((error) => {
            if (error.status != null) return error;
            return { body: String(error), status: 500 };
          })
          .then(({ body, status = 200, headers = defaultHeaders }) => {
            response.writeHead(status, headers);
            response.end(body);
          });
      } else {
        handler(request, response, { public: './public' });
      }
    });
  }
  start(port) {
    this.server.listen(port);
  }
  stop() {
    writeFileSync('./db.json', JSON.stringify(this.talks));
    this.server.close();
  }
};

const talkPath = /^\/talks\/([^\/]+)$/;

router.add('GET', talkPath, async (server, title) => {
  if (title in server.talks) {
    return { body: JSON.stringify(server.talks[title]), headers: { 'Content-Type': 'application/json' } };
  } else {
    return { status: 404, body: `No talk '${title}' found` };
  }
});

router.add('DELETE', talkPath, async (server, title) => {
  if (title in server.talks) {
    delete server.talks[title];
    server.updated();
  }
  return { status: 204 };
});

function readStream(stream) {
  return new Promise((resolve, reject) => {
    let data = '';
    stream.on('error', reject);
    stream.on('data', (chunk) => (data += chunk.toString()));
    stream.on('end', () => resolve(data));
  });
}

router.add('PUT', talkPath, async (server, title, request) => {
  let requestBody = await readStream(request);
  let talk;
  try {
    talk = JSON.parse(requestBody);
  } catch (_) {
    return { status: 400, body: 'Invalid JSON' };
  }

  if (!talk || typeof talk.presenter != 'string' || typeof talk.summary != 'string') {
    return { status: 400, body: 'Bad talk data' };
  }
  server.talks[title] = { id: uuidv4(), title, presenter: talk.presenter, summary: talk.summary, comments: [] };
  server.updated();
  return { status: 204 };
});

router.add('POST', /^\/talks\/([^\/]+)\/comments$/, async (server, title, request) => {
  let requestBody = await readStream(request);
  let comment;
  try {
    comment = JSON.parse(requestBody);
  } catch (_) {
    return { status: 400, body: 'Invalid JSON' };
  }

  if (!comment || typeof comment.author != 'string' || typeof comment.message != 'string') {
    return { status: 400, body: 'Bad comment data' };
  } else if (title in server.talks) {
    server.talks[title].comments.push({ id: uuidv4(), ...comment });
    server.updated();
    return { status: 204 };
  } else {
    return { status: 404, body: `No talk '${title}' found` };
  }
});

SkillShareServer.prototype.talkResponse = function () {
  let talks = [];
  for (let title of Object.keys(this.talks)) {
    talks.push(this.talks[title]);
  }
  return {
    body: JSON.stringify(talks),
    headers: { 'Content-Type': 'application/json', ETag: `"${this.version}"`, 'Cache-Control': 'no-store' },
  };
};

router.add('GET', /^\/talks$/, async (server, request) => {
  let tag = /"(.*)"/.exec(request.headers['if-none-match']);
  let wait = /\bwait=(\d+)/.exec(request.headers['prefer']);
  if (!tag || tag[1] != server.version) {
    return server.talkResponse();
  } else if (!wait) {
    return { status: 304 };
  } else {
    return server.waitForChanges(Number(wait[1]));
  }
});

SkillShareServer.prototype.waitForChanges = function (time) {
  return new Promise((resolve) => {
    this.waiting.push(resolve);
    setTimeout(() => {
      if (!this.waiting.includes(resolve)) return;
      this.waiting = this.waiting.filter((r) => r != resolve);
      resolve({ status: 304 });
    }, time * 1000);
  });
};

SkillShareServer.prototype.updated = function () {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach((resolve) => resolve(response));
  this.waiting = [];
};

const server = new SkillShareServer(database);
server.start(8000);

process.on('SIGINT', () => {
  server.stop();
  process.exit(0);
});
