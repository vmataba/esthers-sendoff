import {useEffect, useState} from 'react'
import Pledge from "./pledge.component.tsx";
import {loadPledges, type PledgeModel} from "../../services/pledge.service.ts";
import {ApiResponseStatus} from "../../utils/api.util.ts";
import PledgeForm from "./pledge-form.component.tsx";

function Pledges() {
    const [pledges, setPledges] = useState<PledgeModel[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showPledgeForm, setShowPledgeForm] = useState(false);
    const [selectedPledge, setSelectedPledge] = useState<PledgeModel | null>(null);
    const [deletedPledgeId, setDeletePledgeId] = useState('');

    useEffect(() => {
        setLoading(true);
        loadPledges().then(response => {
            if (response.status !== ApiResponseStatus.OK) {
                setHasError(true);
                setErrorMessage(response.message);
                setLoading(false);
                return
            }
            setPledges(response.body);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!deletedPledgeId) {
            return;
        }
        setPledges([...pledges.filter(pledge => pledge.id !== deletedPledgeId)]);
        setDeletePledgeId('');
    }, [deletedPledgeId, pledges]);

    const updatePledgeList = (model: PledgeModel) => {
        const exists = pledges.find(pledge => pledge.id === model.id);
        if (exists) {
            return pledges.map(p => p.id === model.id ? model : p);
        }
        return [...pledges, model];
    }


    return <>
        <h1 className='text-center' style={{color: 'deeppink'}}>Sendoff Pledges</h1>
        <input type="text" className="form-control" placeholder="Search pledges" aria-label="Search pledges"
               onChange={(e) => setSearchQuery(e.target.value)}/>
        <div className='mt-3' style={{textAlign: 'right'}}>
            <button type="button" className="btn" style={{backgroundColor: 'deeppink', color: 'white'}}
                    onClick={() => setShowPledgeForm(true)}>
                Add Pledge
            </button>
        </div>

        <div className='pledge-form'>
            {(showPledgeForm || selectedPledge) && <PledgeForm onSubmit={(pledge) => {
                setShowPledgeForm(false);
                setPledges(updatePledgeList(pledge))
            }} model={selectedPledge}
            />}
        </div>

        <ul className="list-group mt-3">
            {loading && <li className="list-group-item text-center">Loading...</li>}
            {hasError && <li className="list-group-item text-center text-danger">{errorMessage}</li>}
            {pledges.length === 0 && !loading && <li className="list-group-item text-center">No pledges found</li>}
            {pledges
                .filter(pledge => JSON.stringify(pledge).toLowerCase().includes(searchQuery.toLowerCase()))
                .sort((a, b) => b.amount - a.amount)
                .map(pledge => <li className='list-group-item'>
                    <Pledge key={pledge.id}
                            model={pledge}
                            onSelect={setSelectedPledge}
                            onDelete={(id) => setDeletePledgeId(id)}/>
                </li>)}
        </ul>
    </>
}

export default Pledges