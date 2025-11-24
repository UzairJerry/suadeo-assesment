// js/components/SearchComponent.js
export default class SearchComponent{
    constructor(root, onSearch){
        this.root = root;
        this.onSearch = onSearch;
        this._render();
    }


    _render(){
        const input = document.createElement('input');
        input.className = 'search-input';
        input.placeholder = 'Search by name, role, company, city...';
        input.addEventListener('input', e => this.onSearch(e.target.value));
        this.root.appendChild(input);
    }
}