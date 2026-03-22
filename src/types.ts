/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'buyer' | 'seller' | 'admin';

export interface UserProfile {
  id: string;
  full_name: string;
  student_number: string;
  university: string;
  email: string;
  role: UserRole;
  is_verified: boolean;
  wallet_balance: number;
}

export interface Listing {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  condition: 'new' | 'used';
  university: string;
  isbn?: string;
  device_verification?: string;
  type: 'product' | 'service';
  created_at: string;
}

export interface Transaction {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  amount: number;
  status: 'escrow' | 'delivered' | 'completed' | 'disputed';
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
}
