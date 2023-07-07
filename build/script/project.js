"use strict";
// ===== ITEM MODAL ======
class ItemModal {
    _id;
    _item;
    _checked;
    constructor(_id = '', _item = '', _checked = false) {
        this._id = _id;
        this._item = _item;
        this._checked = _checked;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get item() {
        return this._item;
    }
    set item(item) {
        this._item = item;
    }
    get checked() {
        return this._checked;
    }
    set checked(checked) {
        this._checked = checked;
    }
}
class ListModal {
    _list;
    static instance = new ListModal();
    constructor(_list = []) {
        this._list = _list;
    }
    get list() {
        return this._list;
    }
    load() {
        const storedList = localStorage.getItem('List');
        if (typeof storedList !== "string")
            return;
        const parsedList = JSON.parse(storedList);
        parsedList.forEach(item => {
            const newItem = new ItemModal(item._id, item._item, item._checked);
            ListModal.instance.add(newItem);
        });
    }
    save() {
        localStorage.setItem('List', JSON.stringify(this._list));
    }
    add(obj) {
        this._list.push(obj);
        this.save();
    }
    del(id) {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }
    clear() {
        this._list = [];
        this.save();
    }
}
class ListTemplate {
    ul;
    static instance = new ListTemplate();
    constructor() {
        this.ul = document.getElementById('item-list');
    }
    create(elem, attributes) {
        const el = document.createElement(elem);
        if (attributes) {
            for (const [key, val] of Object.entries(attributes)) {
                el.setAttribute(key, `${val}`);
            }
        }
        return el;
    }
    clear() {
        this.ul.innerHTML = '';
    }
    render(list) {
        this.clear();
        for (const item of list.list) {
            const li = this.create('li', { class: 'item' });
            const div = this.create('div', { class: 'left' });
            const button = this.create('button', { type: 'button', class: 'item__add-btn' });
            const label = this.create('label', { for: item.id });
            const input = this.create('input', {
                class: 'checkbox', type: 'checkbox',
                id: item.id,
            });
            label.textContent = item.item;
            button.textContent = "X";
            input.addEventListener('change', () => {
                item.checked = !item.checked;
                list.save();
            });
            button.addEventListener('click', () => {
                list.del(item.id);
                this.render(list);
            });
            div.appendChild(input);
            div.appendChild(label);
            li.appendChild(div);
            li.appendChild(button);
            this.ul.appendChild(li);
        }
    }
}
function initApp() {
    const list = ListModal.instance;
    const template = ListTemplate.instance;
    const form = document.getElementById('form');
    form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const input = document.getElementById('new-item');
        const newEntry = input.value.trim();
        if (!newEntry.length)
            return;
        const itemId = list.list.length
            ? parseInt(list.list[list.list.length - 1].id) + 1
            : 1;
        const newItem = new ItemModal(`${itemId}`, newEntry);
        list.add(newItem);
        template.render(list);
    });
    const clearBtn = document.getElementById('clear-btn');
    clearBtn.addEventListener('click', () => {
        list.clear();
        template.clear();
    });
    list.load();
    template.render(list);
}
document.addEventListener('DOMContentLoaded', initApp);
