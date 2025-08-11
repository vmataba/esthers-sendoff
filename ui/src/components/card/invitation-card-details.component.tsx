import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {type InvitationCardModel, viewCard} from '../../services/invitation-card.service';
import {ApiResponseStatus} from '../../utils/api.util';
import './invitation-card-details.css';
import esther_1 from '../../assets/images/esther_1.jpg';
// Add FontAwesome for nice icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faMapMarkerAlt, faPhone, faEnvelope, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const InvitationCardDetails = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [card, setCard] = useState<InvitationCardModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isFlipped, setIsFlipped] = useState<boolean>(false);
    
    useEffect(() => {
        if (!id) {
            setError('No card ID provided');
            setLoading(false);
            return;
        }

        loadCardDetails(id);
    }, [id]);

    const loadCardDetails = async (cardId: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await viewCard(cardId);

            if (response.status === ApiResponseStatus.OK) {
                setCard(response.body);
            } else {
                setError(response.message || 'Failed to load invitation card details');
            }
        } catch (err) {
            setError('An error occurred while loading the card details');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Navigate back in history
    };
    
    const handleFlipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const formatAddress = (address: string) => {
        return address || '29 Main Street, Rochester';
    };

    if (loading) {
        return (
            <div className="invitation-loading">
                Loading invitation details
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="invitation-error">
                <div>{error}</div>
                <button onClick={handleGoBack}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Go Back
                </button>
            </div>
        );
    }

    if (!card) {
        return (
            <div className="invitation-error">
                <div>Card not found</div>
                <button onClick={handleGoBack}>
                    <FontAwesomeIcon icon={faChevronLeft} /> Go Back
                </button>
            </div>
        );
    }

    // Format date nicely
    const eventDate = new Date(card.createdAt || new Date());
    const formattedDate = eventDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const eventTime = eventDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Calculate RSVP date (10 days before the event)
    const rsvpDate = new Date(eventDate.getTime() - 10*24*60*60*1000).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            {/* Google Fonts Import */}
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap"
                rel="stylesheet"/>

            <div className="invitation-container">
                <div className={`invitation-card ${isFlipped ? 'is-flipped' : ''}`}>
                    <div className="card-inner">
                        {/* Front of card */}
                        <div className="card-front">
                            {/* Background image */}
                            <div className="card-background">
                                <img src={esther_1} alt="Celebration background" />
                            </div>
                            
                            {/* Semi-transparent overlay */}
                            <div className="card-overlay"></div>
                            
                            {/* Content */}
                            <div className="invitation-content">
                                <div className="invitation-title">
                                    <h1>Celebrating</h1>
                                    <h2>{card.name}</h2>
                                    <h3>You're Invited</h3>
                                </div>

                                <div className="invitation-details">
                                    <p className="invitation-message">
                                        <span className="invitation-label">Please Join Us</span>
                                        We would be honored by your presence as we celebrate this special occasion
                                    </p>

                                    <p className="invitation-when">
                                        <span className="invitation-label">
                                            <FontAwesomeIcon icon={faCalendarAlt} /> When
                                        </span>
                                        <span className="detail-content">{formattedDate}</span>
                                        <span className="detail-content time">{eventTime}</span>
                                    </p>

                                    <p className="invitation-where">
                                        <span className="invitation-label">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Where
                                        </span>
                                        <span className="detail-content">{formatAddress('Dar es Salaam')}</span>
                                    </p>

                                    <p className="invitation-contact">
                                        <span className="invitation-label">
                                            <FontAwesomeIcon icon={faPhone} /> Contact
                                        </span>
                                        <span className="detail-content">{card.phone}</span>
                                    </p>

                                    <p className="invitation-rsvp">
                                        <span className="invitation-label">
                                            <FontAwesomeIcon icon={faEnvelope} /> RSVP
                                        </span>
                                        <span className="detail-content">By {rsvpDate}</span>
                                    </p>
                                </div>

                                <div className="invitation-actions">
                                    <button className="flip-button" onClick={handleFlipCard}>
                                        Tap for More Details
                                    </button>
                                    <button className="back-button" onClick={handleGoBack}>
                                        <FontAwesomeIcon icon={faChevronLeft} /> Back to Invitations
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Back of card with additional details */}
                        <div className="card-back">
                            <div className="card-overlay"></div>
                            <div className="invitation-content">
                                <h2>Event Details</h2>
                                
                                <div className="additional-details">
                                    <div className="detail-item">
                                        <h4>Dress Code</h4>
                                        <p>Semi-formal attire</p>
                                    </div>
                                    
                                    <div className="detail-item">
                                        <h4>Parking</h4>
                                        <p>Complimentary valet parking available</p>
                                    </div>
                                    
                                    <div className="detail-item">
                                        <h4>Special Notes</h4>
                                        <p>Please let us know of any dietary restrictions</p>
                                    </div>
                                    
                                    <div className="detail-item map">
                                        <h4>Location</h4>
                                        <div className="map-placeholder">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                                            <p>Interactive map will display here</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="flip-button" onClick={handleFlipCard}>
                                    Return to Invitation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InvitationCardDetails;
