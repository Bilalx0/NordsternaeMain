import { Flex, Text, Link } from '@chakra-ui/react'

export default function Home() {

  return (
    <Flex direction="column" justify="center" grow="grow" py={16} px={4} w={{ base: "100vw", md: "80vw", lg: "946px"}} mx="auto">

      <Flex direction="column" align="left">
        <Text fontSize="3xl" fontWeight="bolder" my={2}>Privacy Policy</Text>
          <Text my={2}>{"At Nordstern Real Estate LLC, safeguarding your privacy is of utmost importance to us. We prioritize the security and confidentiality of the personally identifiable information you entrust to us. This policy aims to clarify the types of personal information we collect when you use our website, "}
          <Link color="#312A8F" href="/">www.nordstern.ae</Link>
          {", or any affiliated websites (collectively referred to as the &quot;Site&quot;), as well as when you provide us with information through other means, such as email or telephone."}</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>Information We Collect</Text>
        <Text my={1}>Nordstern gathers non-personally identifiable information about visitors to the Site. This includes aggregate data regarding which pages are accessed or visited. We utilize this information to continually enhance the online experience for our visitors. To improve service upon visitors&apos; return to the Site, we employ cookies to store preferences, record session information (such as properties added to the &quot;My Favourites&quot; section), and track past activity on the site.
Additionally, we collect personally identifiable information that is explicitly provided to us through email, telephone, or by individuals visiting the Site. This includes request and contact information, as well as survey responses.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>Use Of The Information We Collect</Text>
        <Text my={1}>The information we collect serves two primary purposes: to enhance the functionality of the Site and to communicate with individuals who have expressed interest in our products and services. When required, we utilize this information to facilitate the purchase of products and services. Please note that we will only send you updates, offerings, or product information via email or mail if you have provided us with your email or mailing address.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>You May &quot;Opt Out&quot; Of Receiving Future Offerings</Text>
        <Text my={1}>If at any time you wish to opt out of receiving promotions, offerings, or communications from Nordstern in the future, simply click on the &quot;unsubscribe&quot; link within the email you received from us. This will allow you to easily update your preferences and discontinue receiving such communications.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>Third Party Web Beacons</Text>
        <Text my={1}>We utilize third-party web beacons from Google to analyze visitor behavior and activity on the Site. These web beacons help us understand where visitors navigate and what they do while on the Site. Additionally, Google may use anonymous information about your visits to the Site to improve its products and services, as well as to provide advertisements about goods and services that may be of interest to you.</Text>
        <Text my={1}>Web beacons, also known as web bugs, clear GIFs, or pixel tags, are tools used to track your internet journey on specific websites. They are often used for web analytics or page tagging purposes, allowing companies to monitor user activity online.</Text>
        <Text my={1}>{"Please note that the use of web beacons is a common practice on many websites and is not unique to our site. If you would like more information about this practice and to understand your choices regarding the use of this information by Google, you can "}<Link color="#312A8F" href='https://policies.google.com/technologies/partner-sites' isExternal>click here.</Link></Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>Sharing Of Information</Text>
        <Text my={1}>We do not sell or rent your personal information to any third parties. Nordstern will only share your personally identifiable information with our trusted affiliates and authorized service providers who perform specific services or functions on our behalf. These entities are bound by strict confidentiality agreements and are only granted access to the information necessary to carry out their designated tasks.</Text>
        <Text my={1}>Please note that we reserve the right to disclose your personally identifiable information as required by law. In certain circumstances, we may also disclose your information to protect our rights or comply with a judicial proceeding, court order, or legal process involving Nordstern or the Site.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>Updates To Our Policy</Text>
        <Text my={1}>From time to time, Site may use customer information for new and unanticipated purposes that were not previously disclosed in our privacy notice. If there are any changes to our information practices in the future, we will post the policy changes on the Site. This allows us to notify you of these changes and provide you with the option to opt out of these new uses.</Text>
        <Text my={1}>We understand that you may be concerned about how your information is used. Therefore, we encourage you to check back at the Site periodically to stay informed about any updates or changes to our privacy practices.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>Updating Your Information</Text>
        <Text my={1}>We offer visitors the ability to have inaccuracies corrected in their contact information. You can easily update your information by accessing the personal account area on the Site or by contacting us in writing.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>External Links</Text>
        <Text my={1}>The Site may contain links to external websites that are maintained by individuals or organizations external to Nordstern Real Estate LLC. It is important to understand that once you access information that leads you to another website, you become subject to the privacy policy of that external site.</Text>
        <Text my={1}>We encourage you to review the privacy policies of these external sites to understand how they collect, use, and protect your personal information. Nordstern Real Estate LLC is not responsible for the privacy practices or content of these external websites.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>We Protect Your Information</Text>
        <Text my={1}>We value your privacy and we have appropriate security measures in place in our physical facilities to protect against the loss, misuse or alteration of information that we have collected from you at the Site.</Text>
        <Text my={1}>©2023 Nordstern. All rights reserved.</Text>
      </Flex>

      <Flex direction="column" align="left" my={2}>
        <Text fontSize="2xl" my={2}>GDPR Compliance</Text>
        <Text my={1}>In compliance with the new EU General Data Protection Regulation (GDPR) that came into effect on May 25, 2018, the Site may collect and process personal information for the purpose of providing services or fulfilling legal obligations. Please note that if you choose not to provide the requested information, we may be unable to provide you with the services you require. We may also use the personal information for our legitimate business interests, as outlined above.</Text>
        <Text my={1}>It is important to mention that we do not knowingly permit children under the age of 16 in the European Economic Area (EEA) to register for any content, product, or service. We do not knowingly collect, use, or disclose personal information about users under the age of 16, except as permitted by law.</Text>
        <Text my={1}>Regarding the retention of personal information, we keep it for as long as necessary or permitted based on the purpose for which it was obtained. Our retention periods are determined by factors such as the ongoing relationship with you, the provision of services, legal obligations, and our legal position.</Text>
        <Text my={1}>If you have any concerns or questions about our privacy practices or wish to opt out of receiving promotions, offerings, or communications from Nordstern in the future, please click on the &quot;unsubscribe&quot; link within the email you received from us.</Text>
        <Text my={1}>If you would like to receive an electronic copy of your Personal Information or for any questions about this privacy policy, you may contact us at info@nordstern.ae.</Text>
      </Flex>

    </Flex>
  )
}
