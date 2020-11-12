import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [],
})
export class AccountSettingComponent implements OnInit {
  constructor(private _settingService: SettingsService) {}

  ngOnInit(): void {
    this._settingService.checkCurrentTheme();
  }

  // metodo para cambiar tema
  changeTheme(theme: string) {
    this._settingService.changeTheme(theme);
  }
}
