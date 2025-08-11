import {deletePledge, type PledgeModel} from "../../services/pledge.service";
import {ApiResponseStatus} from "../../utils/api.util.ts";

interface Props {
    model: PledgeModel
    onSelect: (pledge: PledgeModel) => void
    onDelete: (id: string) => void
}

const Pledge = (props: Props) => {
    const {model, onSelect, onDelete} = props;
    const {name, phone, amount} = model;

    const handlePledgeDelete = (id: string) => {
        deletePledge(id).then(response => {
            if (response.status === ApiResponseStatus.OK) {
                onDelete(id);
            }
        });
    };

    return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <ul style={{listStyle: 'none'}} key={'profile-' + model.id}>
            <li key={'name-' + model.id} className={'fw-bold'} style={{display: 'flex', alignItems: 'center'}}>
                <div style={{
                    backgroundColor: 'deeppink',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.8rem',
                    justifyContent: 'center'
                }}>
                    {name.charAt(0).toUpperCase()}
                </div>
                <label className={'fw-bold'} style={{paddingLeft: '10px'}}>
                    {name}
                </label>
            </li>
            <li key={'phone-' + model.id} style={{paddingLeft: '45px'}}>{phone}</li>
            <li key={'amount-' + model.id} style={{paddingLeft: '45px', marginTop: '10px'}}>{amount}</li>
        </ul>

        <div className={'action-buttons'} style={{display: 'flex'}}>
            <p className={'fw-bold text-danger'}
               style={{cursor: 'pointer', marginRight: '10px'}}
               onClick={() => model.id && handlePledgeDelete(model.id)}>
                Delete

            </p>
            <p className={'fw-bold'} style={{cursor: 'pointer', color: 'deeppink'}}
               onClick={() => onSelect(model)}>
                Edit
            </p>
        </div>

    </div>


};

export default Pledge;