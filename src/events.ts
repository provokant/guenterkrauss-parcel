export default () => {
  const sectionList: NodeListOf<HTMLElement> = document.querySelectorAll('section');

  sectionList.forEach(section => {
    section.addEventListener('click', (e) => {
      console.log('click', e.target);

      e.srcElement

    });
    section.addEventListener('touchstart', (e) => {
      console.log('touchstart', e.target);
    });
  });
}


// export class Events {

//   private sectionList: NodeListOf<HTMLElement>;

//   constructor () {
//     this.sectionList = document.querySelectorAll('section');
//   }

//   public listen() {
//     this.sectionList.forEach(section => {
//       section.addEventListener('click', (e) => {
//         console.log('click', e.target);
//       });
//       section.addEventListener('touchstart', (e) => {
//         console.log('touchstart', e.target);
//       });
//     });
//   }
// }