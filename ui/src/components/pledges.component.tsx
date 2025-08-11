import {useEffect, useState} from "react";
import {loadPledges, type Pledge} from "../services/pledge.service.ts";

function Pledges() {
    const [pledges, setPledges] = useState<Pledge[]>([]);

    useEffect(() => {
        loadPledges().then(setPledges);
    }, []);

    return <ol>
        {pledges.map(pledge => <li key={pledge.id}>{pledge.name}</li>)}
    </ol>
}

export default Pledges;