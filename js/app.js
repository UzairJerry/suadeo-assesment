// js/app.js
import DataService from './services/DataService.js';
import SearchComponent from './components/SearchComponent.js';
import TableComponent from './components/TableComponent.js';
import { toCSV, download } from './utils/helpers.js';

(async function main(){
    const dataService = new DataService();
    const collection = await dataService.load();

    // UI roots
    const searchRoot = document.getElementById('search-root');
    const tableRoot = document.getElementById('table-root');
    const deptSelect = document.getElementById('dept-filter');
    const exportCsvBtn = document.getElementById('export-csv');
    const exportJsonBtn = document.getElementById('export-json');

    const table = new TableComponent(tableRoot);
    const search = new SearchComponent(searchRoot, text => {
        currentFilters.text = text;
        applyAndRender();
    });

    // populate departments
    function populateDepartments(){
        deptSelect.innerHTML = '';
        const deps = collection.uniqueDepartments;
        deps.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            deptSelect.appendChild(opt);
        });
    }

    // multi-select department filter
    deptSelect.addEventListener('change', ()=>{
        const selected = [...deptSelect.options].filter(o => o.selected).map(o => o.value);
        currentFilters.departments = selected;
        applyAndRender();
    });

    // filters state
    const currentFilters = { text: '', departments: [] };

    function applyAndRender(){
        const filtered = dataService.applyFilters(currentFilters);
        table.setItems(filtered);
    }

    populateDepartments();
    applyAndRender();

    exportCsvBtn.addEventListener('click', ()=>{
        const filtered = dataService.applyFilters(currentFilters);
        const csv = toCSV(filtered);
        download('employees.csv', csv, 'text/csv');
    });

    exportJsonBtn.addEventListener('click', ()=>{
        const filtered = dataService.applyFilters(currentFilters);
        download('employees.json', JSON.stringify(filtered, null, 2), 'application/json');
    });

})();
