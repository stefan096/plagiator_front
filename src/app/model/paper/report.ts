import { Paper } from "./paper";
import Comment from "./comment";

export  default class Report{
	id: number;
	paperUploaded: Paper;
	paperToCheck: Paper;
	comments: Comment[] = [];
}
