import { Link, Head } from "@inertiajs/react";

const Homepage = (props) => {
    console.log(props);
    return (
        <>
            <Head title={props.title} />
            <div>Test</div>
        </>
    );
};

export default Homepage;
