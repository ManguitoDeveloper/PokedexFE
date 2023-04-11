export const  switchBgByType = (type: string) => {
  document.body.className = '';
  document.body.classList.add('bodybg-' + type);
}
