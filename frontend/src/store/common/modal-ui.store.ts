import {action, makeAutoObservable} from 'mobx';

class ModalUIStore {
  visible: boolean = false

  constructor () {
    makeAutoObservable(this, {
      toggleVisible: action,
      toggleVisibleBound: action.bound
    })
  }

  toggleVisible (): void {
    this.visible = !this.visible
  }

  toggleVisibleBound (): void {
    this.toggleVisible()
  }
}

export default ModalUIStore