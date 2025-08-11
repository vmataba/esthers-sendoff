import {useState} from "react";
import {createPledge, type PledgeModel} from "../../services/pledge.service.ts";
import {ApiResponseStatus} from "../../utils/api.util.ts";

interface Props {
    onSubmit: (pledge: PledgeModel) => void
}

function PledgeForm({onSubmit}: Props) {

    const [formData, setFormData] = useState<PledgeModel>({
        name: '',
        phone: '',
        amount: 0
    });

    const resetForm = () => {
        setFormData({
            name: '',
            phone: '',
            amount: 0
        });
    };

    const isValid = () => {
        return formData.name.length > 0 && formData.phone.length > 0 && formData.amount > 0;
    };

    const handleSubmit = () => {
        if (isValid()) {
            createPledge(formData).then(response => {
                if (response.status !== ApiResponseStatus.CREATED) {
                    alert(response.message);
                    return;
                }
                console.log('Pledge created successfully');
                resetForm();
                onSubmit(response.body);
            });
        }
    };

    return <>
        <div className={'row'}>
            <div className={'col'}>
                <div className={'form-group'}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Name"
                           onChange={(e) => {
                               setFormData({
                                   ...formData,
                                   name: e.target.value
                               });
                           }}
                    />
                </div>
            </div>
            <div className={'col'}>
                <div className={'form-group'}>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" className="form-control" id="phone" placeholder="Phone"
                           onChange={(e) => {
                               setFormData({
                                   ...formData,
                                   phone: e.target.value
                               });
                           }}
                    />
                </div>
            </div>
            <div className={'col'}>
                <div className={'form-group'}>
                    <label htmlFor="amount">Amount</label>
                    <input type="text" className="form-control" id="amount" placeholder="Amount"
                           onChange={(e) => {
                               setFormData({
                                   ...formData,
                                   amount: parseFloat(e.target.value)
                               });
                           }}
                    />
                </div>
            </div>
        </div>
        <div style={{textAlign: 'right'}} className={'mt-3'}>
            <button
                type="submit"
                className={isValid() ? 'btn btn-primary' : 'btn btn-primary disabled'}
                onClick={handleSubmit}
            >Submit
            </button>
        </div>
    </>
}

export default PledgeForm