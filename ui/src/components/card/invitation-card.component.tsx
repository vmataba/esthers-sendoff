import { useEffect, useState } from "react";
import { type InvitationCardModel, deleteCard, viewCard } from "../../services/invitation-card.service.ts";
import { ApiResponseStatus } from "../../utils/api.util.ts";

interface Props {
    cardId: string;
    onDelete: () => void;
}

function InvitationCard({ cardId, onDelete }: Props) {
    const [card, setCard] = useState<InvitationCardModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCard();
    }, [cardId]);

    const loadCard = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await viewCard(cardId);
            if (response.status === ApiResponseStatus.OK) {
                setCard(response.body);
            } else {
                setError(response.message || "Failed to load invitation card");
            }
        } catch (err) {
            setError("An error occurred while loading the card");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this invitation card?")) {
            return;
        }

        try {
            const response = await deleteCard(cardId);
            if (response.status === ApiResponseStatus.OK || response.status === ApiResponseStatus.NO_CONTENT) {
                onDelete();
            } else {
                setError(response.message || "Failed to delete invitation card");
            }
        } catch (err) {
            setError("An error occurred while deleting the card");
            console.error(err);
        }
    };

    if (loading) {
        return <div>Loading card details...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!card) {
        return <div className="alert alert-warning">Card not found</div>;
    }

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">
                    <strong>Phone:</strong> {card.phone}
                </p>
                <button 
                    className="btn btn-danger" 
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default InvitationCard;