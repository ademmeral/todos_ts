// ===== ITEM MODAL ======

interface IItem {
  id: string,
  item: string,
  checked: boolean
}

class ItemModal implements IItem {
    
  constructor(
    private _id: string = '',
    private _item: string = '',
    private _checked: boolean = false
  ) {}

  get id(): string{
    return this._id
  }
  set id(id: string) {
    this._id = id
  }

  get item(): string{
    return this._item
  }
  set item(item: string) {
    this._item = item
  }

  get checked(): boolean{
    return this._checked
  }
  set checked(checked: boolean) {
    this._checked = checked
  }
}
// ===== LIST MODAL ======

interface IList {
  list : ItemModal[]
  load(): void,
  save(): void,
  add(obj: IItem): void,
  del(id: string): void
  clear(): void
}

class ListModal implements IList{

  static instance: ListModal =  new ListModal()

  private constructor(
    private _list: ItemModal[] = []
  ) {}

  get list(): ItemModal[]{
    return this._list
  }
  load(): void{
    const storedList: string | null = localStorage.getItem('List')
    
    if (typeof storedList !== "string") return;

    type ParsedList = {
      _id: string,
      _item: string,
      _checked: boolean
    }
    const parsedList: ParsedList[] = JSON.parse(storedList)

    parsedList.forEach(item => {
      const newItem = new ItemModal(item._id, item._item, item._checked)
      ListModal.instance.add(newItem)
    })
    
  }
  save(): void{
    localStorage.setItem('List', JSON.stringify(this._list))
  }
  add(obj:ItemModal): void{
    this._list.push(obj)
    this.save()
  }
  del(id: string): void{
    this._list = this._list.filter(item => item.id !== id)
    this.save()
  }
  clear(): void{
    this._list = []
    this.save()
  }
}
// ===== TEMPLATE ======
interface IDOM{
  ul: HTMLUListElement,
  clear(): void,
  render(list: ListModal): void
  create(elem: string, attributes: Attributes): HTMLElement,
}

type Attributes = {
  [key:string] : number | string | boolean
}

class ListTemplate implements IDOM{

  ul: HTMLUListElement

  static instance: ListTemplate =  new ListTemplate()

  private constructor(){
    this.ul = document.getElementById('item-list') as HTMLUListElement
  }

  create(elem:string, attributes?: Attributes): HTMLElement{
    const el = document.createElement(elem)
    if (attributes) {
      for(const [key, val] of Object.entries(attributes)){
        el.setAttribute(key, `${val}`)
      }
    }
    return el
  }

  clear(): void{
    this.ul.innerHTML = ''
  }

  render(list: ListModal): void {   // We can use that class as a type *!*
    this.clear()
    for (const item of list.list) {

      const li = this.create('li', {class: 'item'}) as HTMLLIElement
      const div = this.create('div', {class: 'left'}) as HTMLDivElement
      const button = this.create('button', {type: 'button', class: 'item__add-btn'}) as HTMLButtonElement
      const label = this.create('label', {for: item.id}) as HTMLLabelElement
      const input = this.create('input', {
        class: 'checkbox', type: 'checkbox',
        id : item.id,
      } ) as HTMLLIElement
      
      label.textContent = item.item
      button.textContent = "X"

      input.addEventListener('change', () => {
        item.checked = !item.checked
        list.save()
      })

      button.addEventListener('click', () => {
        list.del(item.id)
        this.render(list)
      })

      div.appendChild(input)
      div.appendChild(label)
      li.appendChild(div)
      li.appendChild(button)

      this.ul.appendChild(li)
    }
  }
}

function initApp(){
  const list = ListModal.instance
  const template = ListTemplate.instance

  const form = document.getElementById('form') as HTMLFormElement
  form.addEventListener('submit', (ev: SubmitEvent):void => {
    ev.preventDefault()

    const input = document.getElementById('new-item') as HTMLInputElement
    const newEntry = input.value.trim()

    if (!newEntry.length) return

    const itemId = list.list.length
      ? parseInt( list.list[list.list.length - 1].id ) + 1
      : 1

      const newItem = new ItemModal(`${itemId}`, newEntry)
      list.add(newItem)
      template.render(list)

  })

  const clearBtn = document.getElementById('clear-btn') as HTMLButtonElement
  clearBtn.addEventListener('click', () => {
    list.clear()
    template.clear()
  })

  list.load()
  template.render(list)
}


document.addEventListener('DOMContentLoaded', initApp)