import type {PledgeModel} from "../../services/pledge.service";

const Pledge = ({id, name, phone, amount}: PledgeModel) => {
    return <div>
        <p>{id}</p>
        <p>{name}</p>
        <p>{phone}</p>
        <p>{amount}</p>
    </div>;

};

export default Pledge;