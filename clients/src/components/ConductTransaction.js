import React, { Component } from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import history from '../history';

class ConductTransaction extends Component {
    state = { recipient: '', amount: 0, knownAddresses: [] }

    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
            .then(response => response.json())
            .then(json => this.setState({ knownAddresses: json }));
    }

    updateRecipient = event => {
        this.setState({ recipient: String(event.target.value) }); 
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    conductTransaction = () => {
        const { recipient, amount } = this.state;

        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
        .then(json => {
            alert(json.message || json.type);
            history.push('/transaction-pool');
        })
        console.log('this.state', this.state)
    }

    render() {
        console.log('this.state', this.state);

        return (
            <div className='ConductTransaction'>
                <div><Link to='/'>Home</Link></div>
                <h3>Conduct a Transaction</h3>
                <br />
                <h4>Known Addresses</h4>
                {
                    this.state.knownAddresses.map(knownaddress => {
                        return (
                            <div key={knownaddress}>
                                <div>{knownaddress}</div>
                                <br />
                            </div>
                        )
                    })
                }
                <br />
                <FormGroup>
                    <FormControl
                        input='text'
                        placeholder='recipient'
                        value={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </FormGroup>
                <FormGroup>
                    <FormControl
                        input='number'
                        placeholder='amount'
                        value={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </FormGroup>
                <div>
                    <Button
                        bsStyle="danger"
                        onClick={this.conductTransaction}
                    >
                        Submit                        
                    </Button>
                </div>
            </div>
        )
    }
}

export default ConductTransaction;
