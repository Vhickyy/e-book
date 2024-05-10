import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NavbarComponent,FooterComponent,CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})

export class FaqComponent {
  faqs : {question:string,answer:string}[] = [
    {
    question: "What are the services offered by Warm books?",
    answer: "You do not a kyc verification to have an account on warm books , all you need is your email and a verified phone number to get stated"
    },
    {
    question: "What are the services offered by Warm books?",
    answer: "You do not a kyc verification to have an account on warm books , all you need is your email and a verified phone number to get stated"
    },
    {
    question: "What are the services offered by Warm books?",
    answer: "You do not a kyc verification to have an account on warm books , all you need is your email and a verified phone number to get stated"
    },
    {
    question: "What are the services offered by Warm books?",
    answer: "You do not a kyc verification to have an account on warm books , all you need is your email and a verified phone number to get stated"
    },
    {
    question: "What are the services offered by Warm books?",
    answer: "You do not a kyc verification to have an account on warm books , all you need is your email and a verified phone number to get stated"
    },
  ]
}
