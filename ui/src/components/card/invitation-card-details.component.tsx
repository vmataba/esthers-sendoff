import './invitation-card-details.component.css'

const InvitationCardDetails = () => {
    return <div className={'invitation-card shadow'}>
        <h1 className={'heading'}>Mwaliko wa Sendoff</h1>
        <div className={'content'}>
            <p className={'intro'}>
                Familia ya Mr&Mrs. Ezekiel Michael Mmbaga wa
                Same Kilimanjaro, wanayo furaha kukujulisha/kuwajulisha
            </p>

            <p className={'invitee-name'}>{'Eng. Mirabel V. Mataba'}</p>

            Kuwa binti ya mpendwa <span className={'champion-name'}>{'Esther Michael Mmbaga'}</span>
            anatarajia kufunga ndoa takatifu
        </div>

    </div>
}

export default InvitationCardDetails