window.addEventListener('load', () => {
  const select = document.querySelector('#files');
  const textarea = document.querySelector('#file-contents');
  select.addEventListener('change', async (event) => {
    const response = await fetch(event.target.value);
    const fileContents = await response.text();
    textarea.value = fileContents;
  });
  select.dispatchEvent(new Event('change'));

  const form = document.querySelector('#web-editor');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(textarea.value);
    await fetch(select.value, {
      method: 'PUT',
      body: textarea.value,
    });
    select.dispatchEvent(new Event('change'));
  });
});
