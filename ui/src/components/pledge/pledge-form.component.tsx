import {useEffect, useState} from "react";
import {type PledgeModel, savePledge} from "../../services/pledge.service.ts";
import {ApiResponseStatus} from "../../utils/api.util.ts";

interface Props {
    model: PledgeModel | null
    onSubmit: (pledge: PledgeModel) => void
}

function PledgeForm({onSubmit, model}: Props) {

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

    useEffect(() => {
        if (!model) {
            return;
        }
        setFormData({...model})
    }, [model]);

    const isValid = () => {
        return formData.name.length > 0 && formData.phone.length > 0 && formData.amount > 0;
    };

    const handleSubmit = () => {
        if (isValid()) {
            savePledge(formData).then(response => {
                const saved = response.status === ApiResponseStatus.CREATED || response.status === ApiResponseStatus.OK;
                if (!saved) {
                    alert(response.message);
                    return;
                }
                console.log('Saved created successfully');
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
                           value={formData.name}
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
                           value={formData.phone}
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
                           value={formData.amount}
                           onChange={(e) => {
                               setFormData({
                                   ...formData,
                                   amount: parseFloat(e.target.value)
                               });
                           }}/>
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