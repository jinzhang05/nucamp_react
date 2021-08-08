import React, { Component } from 'react'
import {
    Card, CardText, CardBody, CardImg, CardTitle, Label,
    Button, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({ comments, addComment, campsiteId }) {
    if (comments) {
        return (
            <>
                <div className='col-md-5 m-1'>
                    <h4>Comments</h4>
                    {
                        comments.map(comment => {
                            return (
                                <p key={comment.id}>
                                    {comment.text} <br />
                                    --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                                </p>
                            )
                        })
                    }
                </div>
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </>
        )
    }
    return <div />
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className='container'>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id} 
                    />
                </div>
            </div>
        )
    }
    return <div />
}

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(
                this.props.campsiteId,
                values.rating,
                values.rating,
                values.text);
    
    }
    
    render() {
        return (
            <div className='container'>
                <Button outline
                    color="secondary"
                    onClick={this.toggleModal}>
                    <i className='fa fa-pencil fa-lg' />
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating" >Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author" >Author</Label>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Author"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text" >Comment</Label>
                                <Control.textarea model=".text" id="text" name="text" row='6'
                                    className="form-control"
                                />
                            </div>
                            <Button type="submit" value='submit' color='primary'>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default CampsiteInfo;