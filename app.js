window.onload = () => {
    console.log('app started.')
    new GalleryItem(document.getElementById("gallery"));
  }
  
  class GalleryItem {
    constructor(container) {
      this.container = container;
      this.init();
      this.createBigImg();
    }
    init() {
        this.images = this.container.querySelector(".images-container");
     
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(response => response.json())
            .then(photos => {
                this.imagesList = '';
                for (let i = 0; i < 10; i++) {
                    this.imagesList += '' + `
                        <div class="gallery__item-image"> 
                            <img class="image" src="${photos[i].thumbnailUrl} "data-full-size="${photos[i].url}" >
                            <span>${photos[i].title}</span>
                        </div>
                    `;
                document.querySelector('.images-container').innerHTML = this.imagesList;
                };
            });
    }
    createBigImg() {
        this.bigImg = document.createElement('div');
        this.bigImg.classList.add('bigImg');
  
        this.container.append(this.bigImg);
        this.bigImg.addEventListener('click', () => {
            this.bigImg.classList.remove('active')
        });
    
        this.images = this.container.querySelectorAll(".images-container");
        this.images.forEach(item => {
            item.addEventListener('click', e => {
                if (e.target.classList.contains('image')) {
                    this.bigImg.classList.add('active');
                    this.img = document.createElement('img');
                    this.img.src = e.target.getAttribute('data-full-size');
                    while (this.bigImg.firstChild) {
                        this.bigImg.removeChild(this.bigImg.firstChild);
                    }
                    this.bigImg.appendChild(this.img)
                }
            });
        });
    };
  }