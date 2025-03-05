export interface INota {
  titulo: string
  nota: string
  id: string
  isFixed: boolean
  isCheckbox: boolean
  checkboxes?: Array<ICheckbox>
}

export interface ICheckbox {
  check: boolean
  task: string
}
