import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BlogService {

  options;
  domain = this.authService.domain;
  filesToUpload=[];

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        //'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }

  // Function to create a new blog post
  newBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'blogs/newBlog', blog, this.options).map(res => res.json());
  }

  // Function to get all blogs from the database
  getAllBlogs() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/allBlogs', this.options).map(res => res.json());
  }
  getAllUsers() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/allUsers', this.options).map(res => res.json());
  }
  getAllNotifications() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/allNotifications', this.options).map(res => res.json());
  }

  // Function to get the blog using the id
  getSingleBlog(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/singleBlog/' + id, this.options).map(res => res.json());
  }
  getSingleUser(blogC) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'blogs/singleUser/' + blogC, this.options).map(res => res.json());
  }
   // Function to close a blog
   closeBlog(id) {
     console.log(id)
     const closedata= {id:id}
     // Create headers
    return this.http.put(this.domain + 'blogs/closeBlog/', closedata, this.options).map(res => res.json());
  }

  // Function to edit/update blog post
  editBlog(blog) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).map(res => res.json());
  }

  // Function to delete a blog
  deleteBlog(id) {
    
    this.createAuthenticationHeaders(); // Create headers
    return this.http.delete(this.domain + 'blogs/deleteBlog/' + id, this.options).map(res => res.json());
  }
 

  // Function to like a blog post
  likeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/likeBlog/', blogData, this.options).map(res => res.json());
  }

  // Function to dislike a blog post
  dislikeBlog(id) {
    const blogData = { id: id };
    return this.http.put(this.domain + 'blogs/dislikeBlog/', blogData, this.options).map(res => res.json());
  }

  // Function to post a comment on a blog post
  postComment(id, comment, attachements) {
    this.createAuthenticationHeaders(); // Create headers
    // Create blogData to pass to backend
    const blogData = {
      id: id,
      comment: comment,
      attachements: attachements 
      
    }
    
    return this.http.post(this.domain + 'blogs/comment', blogData, this.options).map(res => res.json());

  }
  newNotification(notification) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'blogs/notifications', notification, this.options).map(res => res.json());
  }

  seenNotification(id){
    const notseen ={ id: id};
    return this.http.put(this.domain + 'blogs/seen', notseen, this.options).map(res=> res.json());
  }
  editNotification(newUserSeen) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'blogs/updateNotification/', newUserSeen, this.options).map(res => res.json());
  }
  newEmailNot(newEMail) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'blogs/send', newEMail, this.options).map(res => res.json());
  }
 

}
