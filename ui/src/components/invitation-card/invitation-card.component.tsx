import './invitation-card.component.css'
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {viewInvitationCard} from "../../services/invitation-card.service";
import topRightFlowers from "../../assets/images/top-right-flowers.gif";
import bottomLeftFlowers from "../../assets/images/bottom-left-flowers.gif";
import accountBalanceSvg from "../../assets/images/account-balance.svg";

export const InvitationCard = () => {


    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [inviteeName, setInviteeName] = useState('');
    const params = useParams<{ id: string }>();
    const {id} = params;

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) {
            return;
        }
        viewInvitationCard(atob(id)).then(card => {
            if (!card) {
                return;
            }
            setInviteeName(card.name);
        })
    });

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setToastMessage("Copied: " + text);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
                setToastMessage('');
            }, 3000);
        }, () => {
            alert("Oops, unable to copy");
        });
    }


    function hideToast() {
        setShowToast(false)
    }

    const navigateToPledges = () => {
        if (!id) {
            return;
        }
        navigate('/pledges/' + id);
    }


    return <div className="card-container">
        <div className="card">
            <img src={`${topRightFlowers}`} alt="flower-top" className="flowers-top"/>
            <img src={`${bottomLeftFlowers}`} alt="flower-bottom" className="flowers-bottom"/>

            <div className="header">Mwaliko wa Sendoff</div>

            <div className="content">
                Familia ya <strong>Mr & Mrs Ezekiel Michael Mmbaga</strong> wa Same Kilimanjaro wanayo furaha
                kukujulisha/kuwajulisha <br/>
                <div className="recipient-box" id="inviteeName">
                    {inviteeName}
                </div>
                Kuwa binti yao mpendwa <br/>
                <span className="highlight">Esther Mmbaga</span><br/><br/> Anatarajia kufunga ndoa takatifu
                tarehe <strong>15/11/2025</strong> Dar es Salaam.<br/> Hivyo ukiwa ndugu jamaa na rafiki wa karibu na
                familia hii, <br/> tunaomba mchango wako wa hali
                na mali kuhakikisha shughuli hii inafanikiwa.<br/> Ili kufanikisha shughuli hii muhimu karibu kwa
                mchango/ahadi.
            </div>

            <div className="contacts">
                <div className="copyable" onClick={() => copyToClipboard('0785631012')}>
                    0785631012 (MPESA) - ESTHER MICHAEL MMBAGA
                </div>
                <div className="copyable" onClick={() => copyToClipboard('0152225218900')}>
                    0152225218900 (CRDB) - ESTHER MICHAEL MMBAGA
                </div>
            </div>

            <button className="pledge-button" onClick={navigateToPledges}>
                Pledge Now
            </button>
        </div>

        {showToast && <div id="toast" onClick={hideToast}>
            <img src={`${accountBalanceSvg}`} alt="cash"/>
            <span id="toastMessage">{toastMessage}</span>
        </div>}
    </div>

};