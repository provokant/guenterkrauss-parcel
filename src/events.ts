// import { prototype } from 'stream';

export default () => {
  const sectionList: NodeListOf<HTMLElement> = document.querySelectorAll('section');

  sectionList.forEach(section => {
    section.addEventListener('click', (e) => {
      const element = e.srcElement;
      const section = element.closest('section');
      const article = section.querySelector('article');
      const parent = article.parentElement;

      try {
        document.body.classList.toggle('--overflow-hidden');
        section.classList.toggle('--selected');
        article.classList.toggle('--hidden');
      } finally {
        if (isSelected(section)) {
          const paragraphList = article.childNodes;
          
          splitList(paragraphList, parent, section).map(
            paragraph => {
              console.log(paragraph);
              article.parentElement.appendChild(paragraph);
            }
          );
             
        } else {
          section.querySelectorAll('article.--clone')
            .forEach(clonedArticle => clonedArticle.remove());
        }
      }

      function splitList(
        list: NodeList, 
        parent: HTMLElement,
        section: HTMLElement
      ): Element[] | null {
        let container: HTMLElement = document.createElement('article');
        const splittedList: Element[] = [];

        container.classList.add('--clone');
        parent.appendChild(container);

        list.forEach(paragraph => {
          if (paragraph instanceof Element) {
            container.appendChild(paragraph.cloneNode(true));
            
            console.log(section.clientHeight, section.scrollHeight);

            if (section.clientHeight < section.scrollHeight) {
              // Remove last child, that caused overflow.
              parent.removeChild(container);
              container.removeChild(container.lastChild);
              splittedList.push(container);
              // Reset container and append last child to new container.
              container = document.createElement('article');
              container.classList.add('--clone');
              container.appendChild(paragraph.cloneNode(true));
            }
          }
        });

        return splittedList;
      }





      // try {
      //   const paragraphList = article.childNodes;

      //   for (let paragraph of paragraphList) {
      //     paragraph.remove();
      //   }

      //   paragraphList.forEach(paragraph => {
      //     console.log(paragraph);
      //   });
      // } finally {
      //   document.body.classList.toggle('--overflow-hidden');
      //   parent.classList.toggle('--selected');
      // }
    });
    // section.addEventListener('touchstart', (e) => {
    //   console.log('touchstart', e.target);
    // });
    // section.addEventListener('touchend', (e) => {
    //   console.log('touchend', e.target);
    // });
  });

  function isSelected(element: any): boolean {
    return element.classList.contains('--selected');
  }


  // function closest(target: HTMLElement, selector: string): any {
  //   if (target !== document) {
  //     return (target.matches(selector))
  //       ? target
  //       : closest(target.parentNode, selector);
  //   } else {
  //     return null;
  //   }
  // }
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