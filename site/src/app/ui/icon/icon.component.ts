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
	@Input() icon:  IconModel = undefined;

	@Input() name: string = undefined;
	@Input() color: string = 'black';
	@Input() size: number = 24;
	@Input() opacity : number = 0.8;

	private fullName: string;

	constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
	}

	ngOnInit() {
		if (this.icon && this.icon.name)
			this.name = this.icon.name;
		if (this.icon && this.icon.color)
			this.color = this.icon.color
		if (this.icon && this.icon.size)
			this.size = this.icon.size;

		this.fullName = this.name + '_black_' + this.size;
		this.iconRegistry.addSvgIcon(
			this.fullName,
			this.sanitizer.bypassSecurityTrustResourceUrl('assets/icon/ic_' + this.fullName + 'px.svg'));
	}
}

export interface IconModel {
	name: string ;
	color: string;
	size: number;
	opacity : number ;
}

export class IconBuilder{

	private icon: IconModel;

	constructor(){
		this.icon = { name : undefined, color : 'black' , size: 24, opacity : 0.8};
	}

	withName(name : string){	
		this.icon.name = name;
		return this;
	}
	withColor(color : string){
		this.icon.color = color;
		return this;
	} 
	withSize( size: number){
		this.icon.size = size;
		return this;
	}
	withOpacity( opacity : number){
		this.icon.opacity = opacity;
		return this;
	}

	build() : IconModel{
		return Object.assign({}, this.icon);;
	}


}
