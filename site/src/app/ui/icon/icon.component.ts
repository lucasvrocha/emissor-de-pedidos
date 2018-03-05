import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
	moduleId: module.id,
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {

	@Input() name: string = 'default';
	@Input() color: string = 'black';
	@Input() size: Number = 24;
	@Input() label: string = undefined;

	private fullName: string;

	constructor(private iconRegistry: MatIconRegistry,private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
		this.fullName = this.name + '_' + this.color + '_' + this.size
		this.fullName = this.name + '_' + this.color + '_' + this.size
		this.iconRegistry.addSvgIcon(
			this.fullName,
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/icon/ic_' + this.fullName + 'px.svg'));
	}

}
