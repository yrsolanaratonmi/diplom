import {Injectable} from "@angular/core";
import {Action, State, StateContext} from "@ngxs/store";

export class EditMode {
  static readonly type = '[DarkMode] EditMode'
}


@State({
  name: 'darkMode',
  defaults: false
})
@Injectable()

export class DarkModeState {
  @Action(EditMode)
  editMode (ctx: StateContext<boolean>) {
    ctx.setState(!ctx.getState())
  }
}
