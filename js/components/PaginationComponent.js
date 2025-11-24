// js/components/PaginationComponent.js
export default class PaginationComponent{
    constructor(root, onPage){
        this.root = root;
        this.onPage = onPage;
        this.current = 1;
        this.perPage = 50;
        this.total = 0;
        this._renderBase();
    }


    _renderBase(){
        this.root.innerHTML = '';
        this.info = document.createElement('div');
        this.root.appendChild(this.info);
    }


    set(total){
        this.total = total;
        this._update();
    }


    _update(){
        const totalPages = Math.max(1, Math.ceil(this.total / this.perPage));
        this.info.textContent = `Page ${this.current} / ${totalPages} — ${this.total} items`;
    }
}