import { Injectable } from '@angular/core';

export interface User {
  username: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public getAll(): User[] {
    let data = localStorage.getItem('users')
    return data ? JSON.parse(data) : []
  }

  public crearUser(username: string, email: string, password: string): User {
    let newUser: User = { username, email, password }
    return newUser
  }

  public getByEmail(email: string): User | undefined {
    let data = this.getAll()
    return data.find(user => user.email === email)
  }

  public getByEmailAndPassword(email: string, password: string): User | undefined {
    let data = this.getAll()
    return data.find(user => user.email === email && user.password && password)
  }

  public existsByEmail(email: string): boolean {
    let data = this.getAll()
    return data.find(user => user.email === email) ? true : false
  }

  public addUser(newUser: User): void {
    let data = this.getAll()
    data.push(newUser)
    localStorage.setItem('users', JSON.stringify(data))
  }
}
