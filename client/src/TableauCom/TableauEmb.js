import React,{useRef , useEffect} from 'react';

const { tableau } = window;


function TableauEmb(){
    const ref = useRef(null);
    const url = "https://prod-apnortheast-a.online.tableau.com/t/tableauau/views/Spatial_PM25_Map/Story1?:origin=card_share_link&:embed=n";
   
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