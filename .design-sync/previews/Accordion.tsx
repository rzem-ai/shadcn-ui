import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/new-york-v4/ui/accordion"

export function ProductAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-lg"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you&apos;re not completely satisfied, simply return the
            item in its original condition.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function MultipleAccordion() {
  return (
    <Accordion
      type="multiple"
      className="w-full max-w-lg"
      defaultValue={["billing", "security"]}
    >
      <AccordionItem value="billing">
        <AccordionTrigger>How does billing work?</AccordionTrigger>
        <AccordionContent>
          We offer monthly and annual subscription plans. Billing is charged at
          the beginning of each cycle, and you can cancel anytime. All plans
          include automatic backups and unlimited team members.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="security">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>
          Yes. We use end-to-end encryption, SOC 2 Type II compliance, and
          regular third-party security audits. All data is encrypted at rest and
          in transit.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="integration">
        <AccordionTrigger>What integrations do you support?</AccordionTrigger>
        <AccordionContent>
          We integrate with 500+ popular tools including Slack, Zapier and
          Salesforce. You can also build custom integrations using our REST API
          and webhooks.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function DisabledItemAccordion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-lg overflow-hidden rounded-lg border px-4"
      defaultValue="history"
    >
      <AccordionItem value="history">
        <AccordionTrigger>Can I access my account history?</AccordionTrigger>
        <AccordionContent>
          Yes. Your complete account history — transactions, plan changes and
          support tickets — lives in the Account History section of your
          dashboard.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="premium" disabled>
        <AccordionTrigger>Premium feature information</AccordionTrigger>
        <AccordionContent>
          Upgrade your plan to access this content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="email">
        <AccordionTrigger>How do I update my email address?</AccordionTrigger>
        <AccordionContent>
          Update it in your account settings. You&apos;ll receive a verification
          email at the new address to confirm the change.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
