import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Brends.css'; // Import the CSS file

function Brends() {
    const [data, setData] = useState();
    const [newBrend, setNewBrend] = useState({
        name: '',
        creator: '',
        dateOfEstablishment: '',
        locationOfHeadquarters: '',
        industry: '',
        logo: '',
        description: '',
    });

    const [editBrend, setEditBrend] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const brendsResponse = await axios.get('http://localhost:3000/brends');
                setData({
                    brends: brendsResponse.data,
                });
                console.log('Brends:', brendsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleAddBrend = async () => {
        try {
            const response = await axios.post('http://localhost:3000/brends', newBrend);
            setData(prevData => ({
                brends: [...prevData.brends, response.data],
            }));
            setNewBrend({
                name: '',
                creator: '',
                dateOfEstablishment: '',
                locationOfHeadquarters: '',
                industry: '',
                logo: '',
                description: '',
            });
        } catch (error) {
            console.error('Error adding new brend:', error);
        }
    };

    const handleDeleteBrend = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/brends/${id}`);
            setData(prevData => ({
                brends: prevData.brends.filter(brend => brend.id !== id),
            }));
        } catch (error) {
            console.error('Error deleting brend:', error);
        }
    };

    const handleUpdateBrend = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/brends/${editBrend.id}`, editBrend);
            setData(prevData => ({
                brends: prevData.brends.map(brend => brend.id === editBrend.id ? response.data : brend),
            }));
            setEditBrend(null);
        } catch (error) {
            console.error('Error updating brend:', error);
        }
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Brends:</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Creator</th>
                        <th>Date of Establishment</th>
                        <th>Location of Headquarters</th>
                        <th>Industry</th>
                        <th>Logo</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.brends.map(brend => (
                        <tr key={brend.id}>
                            <td>{brend.id}</td>
                            <td>{brend.name}</td>
                            <td>{brend.creator}</td>
                            <td>{brend.dateOfEstablishment}</td>
                            <td>{brend.locationOfHeadquarters}</td>
                            <td>{brend.industry}</td>
                            <td>
                                <img src={brend.logo} alt={`${brend.name} logo`} />
                            </td>
                            <td>{brend.description}</td>
                            <td>
                                <button onClick={() => setEditBrend(brend)} className='btn-first'>Edit</button>
                                <button onClick={() => handleDeleteBrend(brend.id)} className='btn'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="add-brend-form">
                <h3>{editBrend ? 'Edit Brend' : 'Add New Brend'}</h3>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={editBrend ? editBrend.name : newBrend.name}
                    onChange={e => {
                        if (editBrend) {
                            setEditBrend({ ...editBrend, name: e.target.value });
                        } else {
                            setNewBrend({ ...newBrend, name: e.target.value });
                        }
                    }}
                />
                <label>Creator</label>
                <input
                    type="text"
                    placeholder="Creator"
                    value={editBrend ? editBrend.creator : newBrend.creator}
                    onChange={e => {
                        if (editBrend) {
                            setEditBrend({ ...editBrend, creator: e.target.value });
                        } else {
                            setNewBrend({ ...newBrend, creator: e.target.value });
                        }
                    }}
                />
                <label>Date of Establishment</label>
                <input
                    type="text"
                    placeholder="Date of Establishment"
                    value={editBrend ? editBrend.dateOfEstablishment : newBrend.dateOfEstablishment}
                    onChange={e => {
                        if (editBrend) {
                            setEditBrend({ ...editBrend, dateOfEstablishment: e.target.value });
                        } else {
                            setNewBrend({ ...newBrend, dateOfEstablishment: e.target.value });
                        }
                    }}
                />
                <label>Location of Headquarters</label>
                <input
                    type="text"
                    placeholder="Location of Headquarters"
                    value={editBrend ? editBrend.locationOfHeadquarters : newBrend.locationOfHeadquarters}
                    onChange={e => {
                        if (editBrend) {
                            setEditBrend({ ...editBrend, locationOfHeadquarters: e.target.value });
                        } else {
                            setNewBrend({ ...newBrend, locationOfHeadquarters: e.target.value });
                        }
                    }}
                />
                <label>Industry</label>
                <input
                    type="text"
                    placeholder="Industry"
                    value={editBrend ? editBrend.industry : newBrend.industry}
                    onChange={e => {
                        if (editBrend) {
                            setEditBrend({ ...editBrend, industry: e.target.value });
                        } else {
                            setNewBrend({ ...newBrend, industry: e.target.value });
                        }
                    }}
                />
                <label>Logo URL</label>
                <input
                    type="text"
                    placeholder="Logo URL"
                    value={editBrend ? editBrend.logo : newBrend.logo}
                    onChange={e => {
                        if (editBrend) {
                            setEditBrend({ ...editBrend, logo: e.target.value });
                        } else {
                            setNewBrend({ ...newBrend, logo: e.target.value });
                        }
                    }}
                />
                <label>Description</label>
                <input
                    type="text"
                    placeholder="Description"
                    value={editBrend ? editBrend.description : newBrend.description}
                    onChange={e => {
                        if (editBrend) {
                            setEditBrend({ ...editBrend, description: e.target.value });
                        } else {
                            setNewBrend({ ...newBrend, description: e.target.value });
                        }
                    }}
                />
                <button onClick={editBrend ? handleUpdateBrend : handleAddBrend}>
                    {editBrend ? 'Update' : 'Add'}
                </button>
            </div>
        </div>
    );
}

export default Brends;
