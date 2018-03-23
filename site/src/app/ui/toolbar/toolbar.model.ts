import { IconModel } from '../icon';

export interface ToolbarModel {
	title: ToolbarTitleModel;
	back: ToolbarBackModel ;
	forward: ToolbarForwardModel;
}

export interface ToolbarTitleModel {
	description: string;
	icon: IconModel;
}

export interface ToolbarBackModel {
	url: string,
	icon: IconModel
}

export interface ToolbarForwardModel {
	url: string,
	icon: IconModel
}