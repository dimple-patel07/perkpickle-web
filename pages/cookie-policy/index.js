import React from "react";
import PageBanner from "../../component/pageBanner";
import commonRoute from "../../utils/commonRoute";
import { BrowserView, MobileView, isBrowser, isMobile } from "react-device-detect";

const PrivacyPolicy = () => {
	// GA - raise Cookies Policy
	window.gtag("event", "Cookies Policy", {
		event_label: "Cookies Policy",
	});
	return (
		<>
			<PageBanner title={"Cookie Policy"} description={"Learn more about how we use cookies to enhance your browsing experience by reviewing our Cookie Policy. Please take a moment to read our Cookie Policy to understand how we utilize cookies to improve site functionality and provide you with a more personalized online experience."} />
			<section className="contact-us-section">
				<div className="container">
					<div className="row">
						<h2>Welcome to Perkpickle!</h2>
						<p>Perkpickle is owned and operated by Perkpickle Inc.</p>
						<p>This cookie policy explains how and why cookies and other similar technologies may be stored on and accessed from your device when you use or visit:</p>
						<ul>
							<li>https://perkpickle.com</li>
						</ul>
						<p>(Hereinafter referred to as “Perkpickle”).</p>
						<p>The information collected through cookies will be under responsibility and in charge of:</p>
						<ul>
							<li>Perkpickle Inc.</li>
							<li>Email: support@perkpickle.com</li>
						</ul>
						<p>This cookie policy should be read together with our privacy policy and our terms and conditions.</p>
						<p>By using the website, you accept the use of cookies by Perkpickle, in the terms contained in this policy.</p>

						<h3>1. WHAT ARE COOKIES?</h3>
						<p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to recognize your device and remember if you have been to the website before. Cookies are a very common web technology; most websites use cookies and have done so for years. Cookies are widely used to make the website work more efficiently. Cookies are used to measure which parts of the website users visit and to personalize their experience. Cookies also provide information that helps us monitor and improve the performance of the website.</p>
						<h3>2. CONSENT</h3>
						<p>When you access our website, you will be presented with a notice about the use of cookies. By clicking 'Accept' on this notice, you provide your explicit consent to the use of cookies on your device. These cookies are used to enhance your browsing experience, personalize content, analyze our site traffic and provide specific functionality related to our online operations.</p>
						<p>Your consent allows us to provide you with a more personalized and efficient user experience. If you wish to withdraw your consent at any time, you may do so by changing the cookie settings in</p>
						<p>your browser. However, please note that disabling certain cookies may limit the functionality of the site and affect your user experience.</p>
						<h3>3. LEGAL BASIS AND LEGITIMATE INTERESTS</h3>
						<p>On our website, we use cookies based on our legitimate interests to ensure the best user experience and to continuously improve our website. These interests include optimizing our online offering, personalizing content and advertising, as well as ensuring the security and efficiency of our website.</p>
						<p>Cookies help us understand how users interact with our website, which allows us to adjust and improve our services and functionalities according to their needs and preferences.</p>
						<p>While we believe that these interests do not outweigh your fundamental rights and freedoms, you have the option to refuse or manage the use of cookies through your browser settings or the tools we provide on our website.</p>
						<h3>4. WITHDRAWAL AND OBJECTION (OPT-OUT)</h3>
						<p>By accessing our website, you agree to the use of cookies that enhance the browsing experience and allow the personalization of content and advertisements. However, we understand and respect your right to privacy. If you wish to opt-out or exercise your choice to not participate (Opt- Out), you can set your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
						<p>Please note that some features of the site may not function properly without the use of cookies. In addition, we provide links or tools on our site that allow you to specifically decline the use of certain cookies.</p>
						<h3> 5. STORAGE DURATION OF COOKIES </h3>
						<p>The cookies used on our website have different storage periods, depending on their purpose. Essential cookies, necessary for the basic operation of the website, are kept as long as necessary to provide the requested services.</p>
						<p>Functionality cookies, which remember your preferences and settings, are stored for a period that can vary from the duration of your visit (session cookies) to several years, to ensure a constant user experience. Analytics and advertising cookies have a maximum storage duration of 24 months, after which they will be automatically deleted.</p>
						<p>You can delete or manage these cookies at any time through your browser settings. Deleting or rejecting cookies may affect the functionality of the site and the quality of your experience on our website.</p>
						<h3>6. COOKIE SETTINGS</h3>
						<p>If you do not want cookies to be dropped on your device, you can adjust the setting of your Internet browser to reject the setting of all or some cookies and to alert you when a cookie is placed on your device. For further information about how to do so, please refer to your browser 'help', 'tool', or 'edit' section. Please note that if you use your browser settings to block all cookies, including strictly necessary cookies, you may not be able to access or use all or parts of the functionalities of Perkpickle.</p>
						<p>If you want to remove previously-stored cookies, you can manually delete the cookies at any time. However, this will not prevent Perkpickle from placing further cookies on your device unless and until you adjust your Internet browser setting as described above.</p>
						<p>We provide the links for the management and blocking of cookies depending on the browser you use:</p>
						<BrowserView>
							<ul>
								<li>1. Microsoft Edge: https://support.microsoft.com/en-us/office/delete-cookies-in-microsoft- edge-63947406-40ac-c3b8-57b9-2a946a29ae09?ui=en-us&amp;rs=en-us&amp;ad=us</li>

								<li>2. Firefox: https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox</li>

								<li>3. Chrome: https://support.google.com/chrome/answer/95647?hl=en</li>

								<li>4. Safari: https://support.apple.com/guide/safari/manage-cookies-and-website-data- sfri11471/mac</li>
								<li>5. Opera: https://help.opera.com/en/latest/web-preferences/</li>
							</ul>
						</BrowserView>
						<MobileView>
							<p className="word-break">1. Microsoft Edge: https://support.microsoft.com/en-us/office/delete-cookies-in-microsoft- edge-63947406-40ac-c3b8-57b9-2a946a29ae09?ui=en-us&amp;rs=en-us&amp;ad=us</p>

							<p className="word-break">2. Firefox: https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox</p>

							<p className="word-break">3. Chrome: https://support.google.com/chrome/answer/95647?hl=en</p>

							<p className="word-break">4. Safari: https://support.apple.com/guide/safari/manage-cookies-and-website-data- sfri11471/mac</p>
							<p className="word-break">5. Opera: https://help.opera.com/en/latest/web-preferences/</p>
						</MobileView>

						<p>In cases where you access the website through an iOS or Android mobile device, please follow the instructions below to delete or block cookies on your device:</p>
						<ul>
							<li>Android: https://support.google.com/answer/32050</li>
							<li>iOS: https://support.apple.com/en-us/HT201265</li>
						</ul>
						<h3>7. FIRST-PARTY COOKIES</h3>
						<p>We use cookies to enhance the performance of our website and personalize your online experience. Cookies help us to collect information on how people use our website and which pages they visit. They enable us to monitor the number of visitors and to analyze website usage patterns and trends. We collect this information anonymously, so it does not identify anyone as an individual and no personal information is stored in our cookies. We always use cookie data in a responsible way.</p>
						<h3>8. THIRD-PARTY COOKIES</h3>
						<p>Third-party cookies may come from partners or third-party companies that provide functional web services or tools for our website and the optimal functioning and operation of our services. We use third party cookies responsibly and for the sole purpose of providing optimal functioning of the platform and services. You may opt out of these cookies by following the cookie removal information contained in this document or the technical information of the browser from which you access our website and services.</p>
						<h3>9. PURPOSES OF OUR COOKIES</h3>
						<p>Our cookies are used for the following purposes:</p>
						<p>
							<b>Necessary:</b> Necessary cookies are essential files that enable basic functions on the website, such as navigation and security. They do not collect personal information.
						</p>
						<p>
							<b>Functional:</b> We use functional cookies to enhance your online experience by remembering user preferences and settings and maintaining consistency across the website, without tracking activities.
						</p>
						<p>
							<b>Analytics and Performance:</b> These cookies collect information about how users interact with our website, including the most visited pages, as well as other analytical data. We use this data to improve how our website works and to understand how users interact with the website.
						</p>
						<h3>10. CONTACT US</h3>
						<p>If you have questions or concerns about this cookie policy and the handling and security of your data, please contact us through our contact forms or by using the contact information below:</p>
						<ul>
							<li>
								<b>Perkpickle Inc.</b>
							</li>
							<li>
								<b>Email: support@perkpickle.com</b>
							</li>
						</ul>
						<br />
					</div>
				</div>
			</section>
		</>
	);
};

export default commonRoute(PrivacyPolicy);
