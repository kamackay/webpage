import KeithState from "../KeithState";
import KeithProps from "../KeithProps";
import Social from "./Social";

declare class TestimonialsProps extends KeithProps {
	data: TestimonialsData;
}

declare class TestimonialsData {
	testimonials: Testimonial[];
}

declare class TestimonialsState extends KeithState {
	testimonials: Testimonial[];
}

declare class Testimonial {
	text: string;
	user: string;
}

export { TestimonialsProps, TestimonialsState, TestimonialsData };
