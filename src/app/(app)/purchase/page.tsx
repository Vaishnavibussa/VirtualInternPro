
import { redirect } from 'next/navigation';

export default function PurchasePage() {
    // This page is deprecated. The billing flow is now part of onboarding.
    redirect('/onboarding/billing');
}
