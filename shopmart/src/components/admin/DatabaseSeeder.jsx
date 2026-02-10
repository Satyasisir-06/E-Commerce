import React from 'react';
import { seedDatabase } from '../../utils/seedDatabaseWrapper';

// Simple component to seed the database
export default function DatabaseSeeder() {
    const [isSeeding, setIsSeeding] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleSeed = async () => {
        setIsSeeding(true);
        setMessage('Seeding database... Please wait.');

        const result = await seedDatabase();

        if (result.success) {
            setMessage('✅ Database seeded successfully! Check your Firestore console.');
        } else {
            setMessage(`❌ Error: ${result.error}`);
        }

        setIsSeeding(false);
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>🌱 Database Seeder</h1>
            <p>Click the button below to populate your Firestore database with sample data.</p>

            <button
                onClick={handleSeed}
                disabled={isSeeding}
                style={{
                    padding: '12px 24px',
                    fontSize: '16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isSeeding ? 'not-allowed' : 'pointer',
                    opacity: isSeeding ? 0.6 : 1
                }}
            >
                {isSeeding ? 'Seeding...' : '🚀 Seed Database'}
            </button>

            {message && (
                <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px'
                }}>
                    {message}
                </div>
            )}

            <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '600px', margin: '30px auto' }}>
                <h3>What will be created:</h3>
                <ul>
                    <li>✅ 5 Categories (Electronics, Fashion, Home & Garden, Beauty, Sports)</li>
                    <li>✅ 8 Sample Products with images</li>
                    <li>✅ All with proper timestamps and structure</li>
                </ul>

                <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
                    <strong>Note:</strong> This will create collections automatically.
                    Visit Firebase Console → Firestore to see the data.
                </p>
            </div>
        </div>
    );
}
