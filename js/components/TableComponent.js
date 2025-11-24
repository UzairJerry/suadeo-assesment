// js/components/TableComponent.js
// Implements virtual scrolling for performance.
export default class TableComponent {
    constructor(root, rowHeight = 48) {
        this.root = root;
        this.rowHeight = rowHeight;
        this.container = document.createElement('div');
        this.container.className = 'table';
        this.root.appendChild(this.container);


// using an inner spacer and visible list
        this.spacer = document.createElement('div');
        this.spacer.style.position = 'relative';
        this.root.appendChild(this.spacer);


        this.viewport = this.root; // scroll container
        this.items = [];
        this.visibleStart = 0;
        this.visibleCount = Math.ceil(this.root.clientHeight / this.rowHeight) + 4;


        this.viewport.addEventListener('scroll', () => this._onScroll());


        this._renderHeader();
    }


    _renderHeader() {
        const header = document.createElement('div');
        header.className = 'row header';
        header.innerHTML = `
<div class="cell cell-id small">ID</div>
<div class="cell">Name</div>
<div class="cell">Role</div>
<div class="cell">Department</div>
<div class="cell">Email</div>
<div class="cell">City</div>
`;
        this.container.appendChild(header);
    }


    setItems(items) {
        this.items = items;
        this.totalHeight = items.length * this.rowHeight;
        this.spacer.innerHTML = '';
        this.spacer.style.height = `${this.totalHeight}px`;
        this._onScroll();
    }


    _onScroll() {
        const scrollTop = this.viewport.scrollTop;
        const start = Math.floor(scrollTop / this.rowHeight);
        if (start === this.visibleStart) return;
        this.visibleStart = start;
        this._renderVisible();
    }


    _renderVisible() {
        const start = Math.max(0, this.visibleStart - 2);
        const end = Math.min(this.items.length, start + this.visibleCount);


// clear previous list container
        if (this.listContainer) this.listContainer.remove();


        const list = document.createElement('div');
        list.style.position = 'absolute';
        list.style.top = `${start * this.rowHeight}px`;
        list.style.left = '0';
        list.style.right = '0';


        for (let i = start; i < end; i++) {
            const it = this.items[i];
            const row = document.createElement('div');
            row.className = 'row';
            row.innerHTML = `
<div class="cell cell-id small">${it.id}</div>
<div class="cell">${escapeHtml(it.name)}</div>
<div class="cell">${escapeHtml(it.role)}</div>
<div class="cell">${escapeHtml(it.department)}</div>
<div class="cell">${escapeHtml(it.email)}</div>
<div class="cell">${escapeHtml(it.city)}</div>
`;
            list.appendChild(row);
        }


        this.spacer.appendChild(list);
        this.listContainer = list;
    }
}


function escapeHtml(s) {
    return String(s || '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[c]);
}