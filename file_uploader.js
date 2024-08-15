/** Загрузчик изображений */
class FileUploader{

    /**
     * @param {*} uploaded_image_array массив загружаемых файлов 
     * @param {*} input_node input элемент выбора файла
     * @param {*} images_block блок прикрепленных изображений
     * @param {*} select_image_btn кнопка выбора изображения
     */
    constructor(uploaded_image_array, input_node, images_block = null, select_image_btn = null) {
        this.uploaded_image_array = uploaded_image_array;
        this.images_block = images_block;
        this.input_node = input_node;

        if(select_image_btn !== null) {
            this.select_image_btn = select_image_btn;
            this.select_image_btn.onclick = () =>  this.input_node.click();
        }
        
        this.input_node.onchange = () => this.add();
    }

    add() {
        if(this.images_block) {
            this.images_block.classList.remove('hidden');
        }
            
        for(let i=0 ;i<this.input_node.files.length; i++) {
            // создание блока изображения
            let img_block = document.createElement('div');
            img_block.className = 'img-elem me-2 flex' 
    
            // создание изображения
            let img = document.createElement('img');
            img.className = 'object-cover h-32 me-1';
            img.src = URL.createObjectURL(this.input_node.files[i]);
            img_block.append(img);
    
            // создание крестика удаления
            let button = document.createElement('button');
            button.title = 'удалить изображение';
            button.textContent = 'X';
            img_block.append(button);
    
            // показ изображения на странице
            if(this.images_block) {
                this.images_block.append(img_block);
            }
            
            // кнопка удаления изображения
            button.onclick = () => {
                let img_elem = button.closest('.img-elem');
                let img_src = img_elem.querySelector('img').src;
                delete this.uploaded_image_array[img_src];
                img_elem.remove();
            };
    
            if(this.images_block) {
                this.uploaded_image_array[img.src] = this.input_node.files[i];
            }
        }
    }
}

