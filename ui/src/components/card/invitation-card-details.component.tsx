import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { type InvitationCardModel, viewCard } from '../../services/invitation-card.service';
import { ApiResponseStatus } from '../../utils/api.util';

const InvitationCardDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [card, setCard] = useState<InvitationCardModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
  
  if (loading) {
    return <div className="text-center mt-5">Loading card details...</div>;
  }
  
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <button className="btn btn-primary" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    );
  }
  
  if (!card) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">Card not found</div>
        <button className="btn btn-primary" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    );
  }
  
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>Invitation Card Details</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">{card.name}</h5>
          <p className="card-text">
            <strong>Phone:</strong> {card.phone}
          </p>
          <p className="card-text">
            <strong>ID:</strong> {card.id}
          </p>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationCardDetails;
