import React,{useRef , useEffect} from 'react';

const { tableau } = window;


function TableauEmb(){
    const ref = useRef(null);
    const url = "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard?:language=en&:display_count=y&:origin=viz_share_link";
   
    const option = {
        device: "desktop",
    };

    function initViz(){
        new tableau.Viz(ref.current, url,option)
    }

    useEffect(() => {
        initViz();
        
    }, []);

    return(
        <div>
            <div ref = {ref}>
            </div>
        </div>
    )
}




export default TableauEmb;