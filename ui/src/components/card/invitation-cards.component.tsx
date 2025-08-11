import { useEffect, useState } from "react";
import { type InvitationCardModel, loadInvitationCards, deleteCard } from "../../services/invitation-card.service.ts";
import { ApiResponseStatus } from "../../utils/api.util.ts";
import InvitationCardForm from "./invitation-card-form";

const InvitationCards = () => {
    const [cards, setCards] = useState<InvitationCardModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCard, setSelectedCard] = useState<InvitationCardModel | null>(null);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await loadInvitationCards();
            if (response.status === ApiResponseStatus.OK) {
                setCards(response.body);
            } else {
                setError(response.message || "Failed to load invitation cards");
            }
        } catch (err) {
            setError("An error occurred while loading cards");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCardSubmit = (card: InvitationCardModel) => {
        loadCards();
        setIsFormVisible(false);
        setSelectedCard(null);
    };

    const handleEditCard = (card: InvitationCardModel) => {
        setSelectedCard(card);
        setIsFormVisible(true);
    };

    const handleDeleteCard = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this invitation card?")) {
            return;
        }

        try {
            const response = await deleteCard(id);
            if (response.status === ApiResponseStatus.OK || response.status === ApiResponseStatus.NO_CONTENT) {
                loadCards();
            } else {
                setError(response.message || "Failed to delete invitation card");
            }
        } catch (err) {
            setError("An error occurred while deleting the card");
            console.error(err);
        }
    };

    if (loading && cards.length === 0) {
        return <div>Loading invitation cards...</div>;
    }

    return (
        <div className="container">
            <h1>Invitation Cards</h1>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="mb-3">
                <button 
                    className="btn btn-primary" 
                    onClick={() => {
                        setSelectedCard(null);
                        setIsFormVisible(!isFormVisible);
                    }}
                >
                    {isFormVisible ? "Cancel" : "Add New Card"}
                </button>
            </div>

            {isFormVisible && (
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{selectedCard ? "Edit Card" : "Add New Card"}</h5>
                        <InvitationCardForm 
                            model={selectedCard} 
                            onSubmit={handleCardSubmit} 
                        />
                    </div>
                </div>
            )}

            {cards.length === 0 && !loading ? (
                <div className="alert alert-info">No invitation cards found</div>
            ) : (
                <div className="row">
                    {cards.map(card => (
                        <div className="col-md-4 mb-3" key={card.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{card.name}</h5>
                                    <p className="card-text">
                                        <strong>Phone:</strong> {card.phone}
                                    </p>
                                    <div className="btn-group">
                                        <button 
                                            className="btn btn-outline-primary" 
                                            onClick={() => handleEditCard(card)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger" 
                                            onClick={() => handleDeleteCard(card.id!)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InvitationCards;