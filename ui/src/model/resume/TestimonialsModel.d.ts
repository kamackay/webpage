import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Social from "./Social";

export class TestimonialsProps extends KeithProps {
	data: TestimonialsData;
}

export class TestimonialsData {
	testimonials: Testimonial[];
}

export class TestimonialsState extends KeithState {
	testimonials: Testimonial[];
}

export class Testimonial {
	text: string;
	user: string;
}
