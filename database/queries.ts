export const queriesAttribute = {
  "getAll" : "SELECT * FROM [dbo].[property_attribute]",
  "getById" : "SELECT * FROM [dbo].[property_attribute] WHERE id = @id",
  "getByPropertyType" : "SELECT * FROM [dbo].[property_attribute] WHERE property_type = @property_type",
  "add" :"INSERT INTO [dbo].[property_attribute] (property_type, form_type, label, category, placeholder, property_values) OUTPUT Inserted.ID VALUES (@property_type, @form_type, @label, @category, @placeholder, @values); ",
  "delete" : "DELETE FROM [dbo].[property_attribute] WHERE id = @id",
  "update" : "UPDATE [dbo].[property_attribute] SET property_type = @property_type, form_type = @form_type, label = @label, category = @category, placeholder = @placeholder, property_values = @values WHERE id = @id;"
}

export const queriesLocation = {
  "getAll" : "SELECT * FROM [dbo].[location]",
  "getById" : "SELECT * FROM [dbo].[location] WHERE id = @id",
  "add" :"INSERT INTO [dbo].[location] (country, state, city, municipality, urbanization) OUTPUT Inserted.ID VALUES (@country, @state, @city, @municipality, @urbanization); ",
  "delete" : "DELETE FROM [dbo].[location] WHERE id = @id",
  "update" : "UPDATE [dbo].[location] SET country = @country, state = @state, city = @city, municipality = @municipality, urbanization = @urbanization WHERE id = @id;"
}

export const queriesOwner = {
  "getAll" : "SELECT *  FROM [dbo].[property_client_data]",
  "getById" : "SELECT * FROM [dbo].[owner] WHERE id = @id",
  "add" :"INSERT INTO [dbo].[owner] (first_name, last_name, phone, email, birthday) OUTPUT Inserted.ID VALUES (@first_name, @last_name, @phone, @email, @birthday); ",
  "delete" : "DELETE FROM [dbo].[owner] WHERE id = @id",
  "update" : "UPDATE [dbo].[owner] SET first_name = @first_name, last_name = @last_name, phone = @phone, email = @email, birthday = @birthday WHERE id = @id"
}

export const queriesProperty = {
  "getAll" : "SELECT * FROM [dbo].[property]",
  "getAllDataClosed" : "SELECT * FROM [dbo].[property] WHERE property_status LIKE '%Cerrado%'",
  "getAllDataActive" : "select p.* from property p left join property_location pl on p.id = pl.property_id where p.property_type like @property_type and p.operation_type like @operation_type and (pl.municipality like @filter or pl.city like @filter or pl.urbanization like @filter)",
  "getById" : "SELECT * FROM [dbo].[property] WHERE id = @id",
  "findByCode" : "SELECT * FROM [dbo].[property] WHERE code LIKE @code",
  "getAttributesByPropertyId" : "SELECT * FROM [dbo].[property_atribute_values] WHERE property_id = @property_id",
  "getPropertyByPropertyType" : "SELECT * FROM [dbo].[property_attribute] WHERE property_type = @property_type",
  "getImageByPropertyId" : "SELECT * FROM [dbo].[property_image] WHERE property_id = @property_id",
  "getFileByPropertyId" : "SELECT * FROM [dbo].[property_file] WHERE property_id = @property_id",
  "getLocationByPropertyId" : "SELECT * FROM [dbo].[property_location] WHERE property_id = @property_id",
  "getClientDataByPropertyId" : "SELECT * FROM [dbo].[property_client_data] WHERE property_id = @property_id",
  "getHistoricByPropertyId" : "SELECT * FROM [dbo].[historic] WHERE property_id = @property_id",
  "getUserByIdCaptador" : "SELECT * FROM [dbo].[user] WHERE id = @id",
  "getUserByIdVendedor" : "SELECT * FROM [dbo].[user] WHERE id = @id",
  "getLastUpdatedDate" : "select TOP 1 * from historic WHERE property_id = @property_id ORDER BY id DESC",
  "add" :"INSERT INTO [dbo].[property] (company, user_id, code, operation_type, property_type, property_condition, footage_ground, footage_building, description, price, property_status, seller_id) OUTPUT Inserted.ID VALUES (@company, @user_id, @code, @operation_type, @property_type, @property_condition, @footage_ground, @footage_building, @description, @price, @property_status, @seller_id);",
  "addAttribute" :"INSERT INTO [dbo].[property_atribute_values] (property_id, property_attribute_id, value) OUTPUT Inserted.ID VALUES (@property_id, @property_attribute_id, @value);",
  "addImage" :"INSERT INTO [dbo].[property_image] (property_id, image) OUTPUT Inserted.ID VALUES (@property_id, @image);",
  "addFile" :"INSERT INTO [dbo].[property_file] (property_id, fileName, name) OUTPUT Inserted.ID VALUES (@property_id, @fileName, @name);",
  "addLocation" :"INSERT INTO [dbo].[property_location] (property_id, country, state, municipality, urbanization, avenue, street, building_shoppingcenter, building_number, floor, reference_point, hot_to_get, trunk_number, parking_number, trunk_level, parking_level, city) OUTPUT Inserted.ID VALUES (@property_id, @country, @state, @municipality, @urbanization, @avenue, @street, @building_shoppingcenter, @building_number, @floor, @reference_point, @hot_to_get, @trunk_number, @parking_number, @trunk_level, @parking_level, @city);",
  "addHistoric" :"INSERT INTO [dbo].[historic] (status, comments, property_id, user_id, username) OUTPUT Inserted.ID VALUES (@status, @comments, @property_id, @user_id, @username);",
  "addClientData" :"INSERT INTO [dbo].[property_client_data] (property_id, property_origin, document_condition, cadastral_file, main_living_place, power, power_condition, mortgage, part_of_payment, commission, commission_seller, observations, first_name, last_name, phone, email, birthday, contact_first_name, contact_last_name, contact_phone, contact_email, attorney_first_name, attorney_last_name, attorney_phone, attorney_email) OUTPUT Inserted.ID VALUES (@property_id, @property_origin, @document_condition, @cadastral_file, @main_living_place, @power, @power_condition, @mortgage, @part_of_payment, @commission, @commission_seller, @observations, @first_name, @last_name, @phone, @email, @birthday, @contact_first_name, @contact_last_name, @contact_phone, @contact_email, @attorney_first_name, @attorney_last_name, @attorney_phone, @attorney_email);",
  "delete" : "DELETE FROM [dbo].[property] WHERE id = @id",
  "updateCreatedDate" : "UPDATE [dbo].[property] SET created_date = @created_date WHERE id = @id",
  "updateStatus" : "UPDATE [dbo].[property] SET property_status = @property_status WHERE id = @id",
  "updateSellerAndRoyalty" : "UPDATE [dbo].[property] SET seller_id = @seller_id, final_price = @final_price, commision_royalty = @commision_royalty, commision_rental_type = @commision_rental_type, commision_royalty_seller = @commision_royalty_seller, commision_rental_type_seller = @commision_rental_type_seller WHERE id = @id",
  "updateHistoric" : "UPDATE [dbo].[historic] SET property_id = @property_id WHERE property_id = @property_id_old",
  "updateCommentHistoric" : "UPDATE [dbo].[historic] SET comments = @comments WHERE id = @id",
  "updateComission" : "UPDATE [dbo].[property_client_data] SET commission = @commission, commission_seller = @commission_seller WHERE property_id = @property_id",
  "updateExternal" : "UPDATE [dbo].[property] SET externalFistName = @externalFistName, externalLastName = @externalLastName, externalIdentification = @externalIdentification, externalCompany = @externalCompany, externalPhoneNumber = @externalPhoneNumber, externalObservations = @externalObservations WHERE id = @id"
}

export const queriesPropertyExternal = {
  "getAll" : "SELECT * FROM [dbo].[property_external]",
  "getById" : "SELECT * FROM [dbo].[property_external] WHERE id = @id",
  "add" :"INSERT INTO [dbo].[property_external] (user_id, username, operation_type, property_type, final_price, commission, commision_royalty, commision_rental_type, commission_seller, commision_royalty_seller, commision_rental_type_seller, externalFistName, externalLastName, externalIdentification, externalCompany, externalPhoneNumber, externalObservations, country, state, municipality, urbanization) OUTPUT Inserted.ID VALUES (@user_id, @username, @operation_type, @property_type, @final_price, @commission, @commision_royalty, @commision_rental_type, @commission_seller, @commision_royalty_seller, @commision_rental_type_seller, @externalFistName, @externalLastName, @externalIdentification, @externalCompany, @externalPhoneNumber, @externalObservations, @country, @state, @municipality, @urbanization);",
  "delete" : "DELETE FROM [dbo].[property_external] WHERE id = @id",
  "update" : "UPDATE [dbo].[property_external] SET operation_type = @operation_type, property_type = @property_type, final_price = @final_price, commission = @commission, commision_royalty = @commision_royalty, commision_rental_type = @commision_rental_type, commission_seller = @commission_seller, commision_royalty_seller = @commision_royalty_seller, commision_rental_type_seller = @commision_rental_type_seller, externalFistName = @externalFistName, externalLastName = @externalLastName, externalIdentification = @externalIdentification, externalCompany = @externalCompany, externalPhoneNumber = @externalPhoneNumber, externalObservations = @externalObservations , country = @country , state = @state , municipality = @municipality , urbanization = @urbanization  WHERE id = @id"
}

export const queriesUser = {
  "getAll" : "SELECT * FROM [dbo].[user]",
  "getAllSellers" : "SELECT * FROM [dbo].[user] WHERE user_type = 'Asesor Inmobiliario Externo' OR user_type = 'Administrador'",
  "getById" : "SELECT * FROM [dbo].[user] WHERE id = @id",
  "getByUsername" : "SELECT * FROM [dbo].[user] WHERE username = @username",
  "getUserByPropertyId" : "select * from [user] where id in (select user_id from property where id = @id)",
  "getByEmail" : "SELECT * FROM [dbo].[user] WHERE email = @email",
  "add" :"INSERT INTO [dbo].[user] (first_name, last_name, username, password, phone_number1, phone_number2, email, fiscal_address, birthday, profession, city, state, user_type, social_facebook, social_twitter, social_instagram, social_youtube, image, sequence) OUTPUT Inserted.ID VALUES (@first_name, @last_name, @username, @password, @phone_number1, @phone_number2, @email, @fiscal_address, @birthday, @profession, @city, @state, @user_type, @social_facebook, @social_twitter, @social_instagram, @social_youtube, @image, @sequence); ",
  "delete" : "DELETE FROM [dbo].[user] WHERE id = @id",
  "update" : "UPDATE [dbo].[user] SET first_name = @first_name, last_name = @last_name, username = @username, password = @password, phone_number1 = @phone_number1, phone_number2 = @phone_number2, email = @email, fiscal_address = @fiscal_address, birthday = @birthday, profession = @profession, city = @city, state = @state, user_type = @user_type, social_facebook = @social_facebook, social_twitter = @social_twitter, social_instagram = @social_instagram, social_youtube = @social_youtube, image = @image WHERE id = @id"
}

export const queries = {
  "getAllData" : "SELECT TOP(5) * FROM [dbo].[user_info]",
  "addNewUser" :"INSERT INTO [dbo].[user_info] (name,email,password) VALUES (@user,@email,@password) ",
  "deleteUser" : "DELETE FROM [dbo].[user_info] WHERE name = @userName",
  "updateUserDetails" : "UPDATE [dbo].[user_info] SET password = @newPassword WHERE name = @userName"
}







