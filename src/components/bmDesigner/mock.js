// uuid 函数
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class mock {
  static imageList() {
    return Array.from({ length: 10 }).map((item, index) => {
      let obj;
      if (index === 0) {
        obj = {
          id: uuid(),
          name: `图片${index}`,
          url: require("./img/pic_1.png"),
        };
      } else if (index === 1) {
        obj = {
          id: index,
          name: `图片${index}`,
          url: require("./img/pic_2.png"),
        };
      } else {
        obj = {
          id: uuid(),
          name: `图片${index}`,
          url: require("./img/pic_2.png"),
        };
      }
      return obj;
    });
  }

  static productList() {
    return Array.from({ length: 10 }).map((item, index) => {
      let obj;
      if (index === 0) {
        obj = {
          id: uuid(),
          name: `产品图${index}`,
          url: require("./img/public_texture_white_left_500.png"),
          productImg: require("./img/public_texture_white_left_500.png"),
          bgImg: require("./img/background_white_left_500.png"),
          isCollect: index !== 1,
          width: 100,
          height: 100,
          d1: getD().d_1.d1,
          d2: getD().d_1.d2,
          d3: getD().d_1.d3,
        };
      } else {
        obj = {
          id: uuid(),
          name: `产品图${index}`,
          url: require("./img/prod_design_2.png"),
          productImg: require("./img/prod_design_2.png"),
          bgImg: require("./img/bd_design_2.png"),
          isCollect: index !== 1,
          width: 100,
          height: 100,
          d1: getD().d_2.d1,
          d2: getD().d_2.d2,
          d3: getD().d_2.d3,
        };
      }
      return obj;
    });
  }
}

function getD() {
  return {
    d_1: {
      d1:
        "M238.376,13.525c2.388-0.04,3.021,0.57,4.375,0.875c1.2,0.27,2.932-0.657,4.625-0.375\n" +
        "\t\t\tc3.125,0.542,6.25,1.083,9.375,1.625c6.332,1.886,13.011,3.537,18.25,6.625c10.153,5.984,18.987,15.742,23.875,26.875\n" +
        "\t\t\tc3.359,7.651,5.121,16.443,7.25,25.5c2.417,10.283,2.288,21.372,4.125,32.375c0.208,4.458,0.417,8.917,0.625,13.375\n" +
        "\t\t\tc0.167,19.915,0.333,39.835,0.5,59.75c0.208,7.458,0.417,14.917,0.625,22.375c0.167,6.791,0.333,13.584,0.5,20.375\n" +
        "\t\t\tc0.833,18.373,1.667,36.752,2.5,55.125c0.208,5.249,0.417,10.501,0.625,15.75c0.125,3.083,0.25,6.167,0.375,9.25\n" +
        "\t\t\tc0.625,6.499,1.25,13.001,1.875,19.5c0.167,3.5,0.333,7,0.5,10.5c0.125,2.916,0.25,5.834,0.375,8.75c0,3.958,0,7.917,0,11.875\n" +
        "\t\t\tc-0.992,6.036-0.549,11.98-1.625,17.5c-0.333,3.125-0.667,6.25-1,9.375c-1.274,6.409-2.377,12.84-4.25,18.625\n" +
        "\t\t\tc-0.917,2.916-1.833,5.834-2.75,8.75c-2.388,4.505-4.233,9.103-6.875,13.25c-8.243,12.939-21.381,23.205-37.5,28.25\n" +
        "\t\t\tc-4.093,1.281-8.33,2.324-12.75,3.25c-3.041,0.333-6.084,0.667-9.125,1c-4.271,0.704-9.565-0.294-13.375-1\n" +
        "\t\t\tc-11.832-2.191-21.725-4.774-30.375-9.875c-22.556-13.303-35.591-35.258-44-62.75c-2.625-8.581-3.444-17.634-5.25-27.125\n" +
        "\t\t\tc-1.17-6.151-1.237-13.116-2.375-19.625c-0.042-1.542-0.083-3.083-0.125-4.625c-0.511-3.263-0.684-8.34-0.125-11.75\n" +
        "\t\t\tc0.083-3.416,0.167-6.834,0.25-10.25c0.375-5.541,0.75-11.084,1.125-16.625c0.792-7.499,1.583-15.001,2.375-22.5\n" +
        "\t\t\tc0.167-2.916,0.333-5.834,0.5-8.75c0.375-6.791,0.75-13.584,1.125-20.375c0.167-5.249,0.333-10.501,0.5-15.75\n" +
        "\t\t\tc0.292-11.624,0.583-23.251,0.875-34.875c0.667-9.374,1.333-18.751,2-28.125c3.85-22.928,5.536-46.528,11-67.875\n" +
        "\t\t\tc3.287-12.84,5.267-26.347,10-37.875c3.403-8.289,8.619-15.567,13.875-22.125c6.278-7.834,19.759-13.822,31.375-16.375\n" +
        "\t\t\tc3.833-0.5,7.667-1,11.5-1.5C235.293,13.775,236.835,13.65,238.376,13.525z",
      d2: "M0.001,0.025h482.75v459.25H0.001V0.025z",
      d3:
        "M479.339,43.887c-0.562,1.407-1.127,2.812-1.694,4.218c-0.567,1.404-1.138,2.809-1.71,4.211\n" +
        "\t\t\tc-0.573,1.403-1.149,2.804-1.728,4.205c-0.579,1.401-1.16,2.8-1.745,4.198c-0.585,1.398-1.172,2.794-1.762,4.189\n" +
        "\t\t\tc-0.59,1.395-1.184,2.79-1.78,4.182c-0.596,1.393-1.196,2.785-1.798,4.176c-0.602,1.391-1.207,2.779-1.815,4.167\n" +
        "\t\t\tc-0.608,1.388-1.22,2.774-1.834,4.16c-0.614,1.385-1.23,2.77-1.849,4.153c-0.619,1.383-1.241,2.764-1.866,4.144\n" +
        "\t\t\tc-0.624,1.381-1.251,2.76-1.874,4.141c-0.623,1.381-1.242,2.764-1.858,4.149c-0.615,1.385-1.228,2.771-1.838,4.158\n" +
        "\t\t\tc-0.609,1.387-1.216,2.775-1.819,4.165c-0.604,1.39-1.204,2.781-1.8,4.174c-0.597,1.393-1.19,2.787-1.781,4.182\n" +
        "\t\t\tc-0.59,1.396-1.178,2.792-1.762,4.191c-0.584,1.398-1.165,2.797-1.743,4.198c-0.578,1.401-1.152,2.802-1.724,4.206\n" +
        "\t\t\tc-0.572,1.403-1.14,2.809-1.705,4.214c-0.565,1.406-1.127,2.813-1.686,4.222c-0.558,1.408-1.114,2.818-1.667,4.228\n" +
        "\t\t\tc-0.552,1.411-1.102,2.823-1.649,4.236c-0.546,1.413-1.09,2.828-1.63,4.244c-0.54,1.415-1.077,2.832-1.611,4.25\n" +
        "\t\t\tc-0.534,1.418-1.065,2.837-1.593,4.257c-0.528,1.421-1.053,2.842-1.575,4.264c-0.521,1.423-1.04,2.847-1.556,4.271\n" +
        "\t\t\tc-0.453,1.25-0.903,2.502-1.351,3.754c-0.062,0.175-0.187,0.524-0.187,0.524l-1.144,3.223c0,0-0.25,0.707-0.374,1.061\n" +
        "\t\t\tc-0.503,1.429-1.002,2.86-1.497,4.292c-0.496,1.432-0.988,2.865-1.477,4.298c-0.489,1.434-0.974,2.87-1.455,4.307\n" +
        "\t\t\tc-0.481,1.437-0.959,2.875-1.433,4.314c-0.474,1.44-0.943,2.88-1.409,4.321c-0.465,1.442-0.928,2.885-1.385,4.33\n" +
        "\t\t\tc-0.458,1.444-0.911,2.89-1.36,4.337c-0.45,1.447-0.894,2.896-1.335,4.345c-0.44,1.45-0.876,2.901-1.307,4.354\n" +
        "\t\t\tc-0.432,1.452-0.858,2.905-1.28,4.361c-0.422,1.455-0.839,2.912-1.252,4.37c-0.413,1.458-0.821,2.917-1.223,4.378\n" +
        "\t\t\tc-0.402,1.46-0.798,2.923-1.195,4.385c-0.397,1.462-0.795,2.924-1.194,4.386c-0.399,1.462-0.8,2.923-1.203,4.383\n" +
        "\t\t\tc-0.403,1.461-0.806,2.922-1.21,4.382c-0.405,1.46-0.812,2.919-1.22,4.378c-0.408,1.459-0.819,2.918-1.232,4.376\n" +
        "\t\t\tc-0.412,1.458-0.826,2.916-1.243,4.373c-0.416,1.457-0.835,2.913-1.256,4.368c-0.421,1.456-0.844,2.911-1.27,4.365\n" +
        "\t\t\tc-0.426,1.454-0.854,2.907-1.286,4.359c-0.431,1.453-0.865,2.905-1.302,4.355c-0.437,1.45-0.877,2.9-1.32,4.349\n" +
        "\t\t\tc-0.443,1.449-0.89,2.897-1.339,4.344c-0.45,1.447-0.903,2.893-1.36,4.338c-0.456,1.444-0.917,2.888-1.381,4.33\n" +
        "\t\t\tc-0.464,1.443-0.932,2.884-1.404,4.324c-0.471,1.44-0.947,2.879-1.427,4.316c-0.48,1.437-0.963,2.873-1.452,4.308\n" +
        "\t\t\tc-0.488,1.434-0.981,2.867-1.478,4.298c-0.497,1.432-0.998,2.861-1.505,4.29c-0.507,1.428-1.017,2.854-1.533,4.279\n" +
        "\t\t\tc-0.516,1.425-1.037,2.847-1.562,4.268c-0.526,1.421-1.056,2.84-1.593,4.257c-0.537,1.418-1.078,2.832-1.625,4.245\n" +
        "\t\t\tc-0.547,1.413-1.098,2.826-1.659,4.232c-1.412,3.542-2.885,7.053-4.359,10.58c-0.082,0.198-0.36,0.865-0.36,0.865l-1.556,3.63\n" +
        "\t\t\tc0,0-0.459,1.196-0.591,1.515c-9.83,23.553-20.056,47.516-36.621,66.699c-0.976,1.13-1.974,2.244-2.988,3.341\n" +
        "\t\t\tc-1.015,1.098-2.046,2.18-3.095,3.244c-1.049,1.065-2.116,2.111-3.202,3.138c-1.085,1.027-2.189,2.035-3.311,3.022\n" +
        "\t\t\tc-1.122,0.987-2.263,1.954-3.422,2.897c-1.159,0.943-2.336,1.864-3.533,2.76c-1.196,0.896-2.411,1.767-3.643,2.611\n" +
        "\t\t\tc-1.233,0.845-2.484,1.663-3.754,2.451c-1.27,0.789-2.557,1.549-3.861,2.277c-1.305,0.729-2.627,1.427-3.964,2.094\n" +
        "\t\t\tc-1.337,0.668-2.689,1.306-4.054,1.915c-1.364,0.609-2.742,1.188-4.131,1.741c-1.389,0.552-2.789,1.076-4.198,1.574\n" +
        "\t\t\tc-1.409,0.497-2.828,0.969-4.254,1.414c-1.426,0.446-2.861,0.866-4.301,1.263c-1.441,0.395-2.888,0.768-4.342,1.118\n" +
        "\t\t\tc-1.453,0.35-2.912,0.676-4.375,0.981c-1.463,0.305-2.931,0.589-4.401,0.852c-1.471,0.263-2.946,0.505-4.424,0.728\n" +
        "\t\t\tc-1.478,0.223-2.958,0.427-4.442,0.612c-1.483,0.185-2.968,0.351-4.455,0.499c-1.487,0.148-2.976,0.276-4.466,0.388\n" +
        "\t\t\tc-1.491,0.112-2.982,0.207-4.474,0.282c-1.492,0.076-2.986,0.133-4.48,0.174c-0.675,0.018-1.301,0.094-1.301,0.094h-3.372\n" +
        "\t\t\tc0,0-0.592-0.068-1.228-0.085c-1.493-0.04-2.985-0.1-4.477-0.183c-1.491-0.082-2.981-0.188-4.469-0.316\n" +
        "\t\t\tc-1.489-0.128-2.974-0.28-4.458-0.454c-1.484-0.175-2.964-0.373-4.441-0.595c-1.477-0.222-2.95-0.467-4.419-0.738\n" +
        "\t\t\tc-1.469-0.271-2.933-0.565-4.392-0.885c-1.459-0.32-2.913-0.665-4.359-1.036c-1.447-0.371-2.886-0.767-4.319-1.189\n" +
        "\t\t\tc-1.432-0.423-2.857-0.872-4.272-1.348c-1.416-0.476-2.822-0.979-4.218-1.511c-1.396-0.531-2.781-1.09-4.154-1.677\n" +
        "\t\t\tc-1.374-0.587-2.735-1.203-4.082-1.848c-1.347-0.645-2.68-1.319-3.997-2.023c-1.318-0.703-2.62-1.436-3.906-2.196\n" +
        "\t\t\tc-1.285-0.76-2.555-1.547-3.808-2.36c-1.253-0.812-2.489-1.651-3.709-2.513c-1.22-0.862-2.423-1.747-3.609-2.655\n" +
        "\t\t\tc-1.186-0.907-2.355-1.837-3.508-2.787c-1.152-0.95-2.288-1.92-3.408-2.908c-1.119-0.989-2.221-1.997-3.308-3.022\n" +
        "\t\t\tc-1.086-1.025-2.156-2.067-3.21-3.126c-1.053-1.059-2.089-2.135-3.11-3.225s-2.024-2.196-3.011-3.317\n" +
        "\t\t\tc-0.987-1.121-1.958-2.256-2.914-3.404c-0.956-1.148-1.898-2.309-2.817-3.485c-14.309-18.315-23.07-40.458-32.183-61.908\n" +
        "\t\t\tc-0.232-0.546-0.406-0.967-0.406-0.967l-1.297-2.852c0,0-0.221-0.693-0.303-0.885c-0.164-0.385-0.328-0.771-0.491-1.157\n" +
        "\t\t\tc-0.595-1.41-1.183-2.823-1.765-4.238c-0.584-1.415-1.161-2.831-1.734-4.25c-0.573-1.42-1.141-2.841-1.705-4.264\n" +
        "\t\t\tc-0.565-1.422-1.124-2.846-1.679-4.272c-0.555-1.426-1.107-2.853-1.655-4.283c-0.548-1.428-1.092-2.859-1.634-4.291\n" +
        "\t\t\tc-0.54-1.431-1.078-2.864-1.613-4.297c-0.535-1.434-1.068-2.869-1.597-4.305c-0.529-1.437-1.055-2.874-1.578-4.311\n" +
        "\t\t\tc-0.523-1.439-1.043-2.878-1.559-4.319c-0.516-1.441-1.029-2.883-1.539-4.326c-0.509-1.443-1.016-2.887-1.518-4.332\n" +
        "\t\t\tc-0.503-1.445-1.003-2.893-1.498-4.34c-0.496-1.448-0.988-2.897-1.476-4.348c-0.489-1.45-0.973-2.901-1.454-4.354\n" +
        "\t\t\tc-0.481-1.453-0.958-2.907-1.432-4.362c-0.474-1.456-0.943-2.913-1.409-4.37c-0.465-1.458-0.927-2.918-1.385-4.378\n" +
        "\t\t\tc-0.457-1.46-0.91-2.922-1.359-4.384c-0.45-1.463-0.894-2.928-1.335-4.393c-0.441-1.466-0.877-2.933-1.309-4.401\n" +
        "\t\t\tc-0.432-1.469-0.86-2.937-1.283-4.408c-0.423-1.471-0.841-2.942-1.255-4.416c-0.414-1.473-0.824-2.949-1.228-4.425\n" +
        "\t\t\tc-0.405-1.475-0.805-2.953-1.199-4.431c-0.396-1.478-0.785-2.957-1.171-4.439c-0.385-1.481-0.766-2.962-1.143-4.446\n" +
        "\t\t\tc-0.377-1.483-0.75-2.968-1.119-4.453c-0.37-1.485-0.736-2.971-1.1-4.457c-0.363-1.486-0.724-2.974-1.084-4.461\n" +
        "\t\t\tc-0.359-1.488-0.716-2.976-1.072-4.464c-0.356-1.489-0.711-2.978-1.064-4.467c-0.355-1.489-0.708-2.978-1.061-4.466\n" +
        "\t\t\tc-0.354-1.489-0.707-2.978-1.062-4.467c-0.354-1.489-0.71-2.977-1.066-4.466c-0.356-1.488-0.713-2.977-1.073-4.465\n" +
        "\t\t\tc-0.36-1.488-0.723-2.974-1.093-4.458c-0.371-1.485-0.749-2.968-1.135-4.449c-0.386-1.481-0.777-2.961-1.176-4.438\n" +
        "\t\t\tc-0.398-1.478-0.803-2.954-1.213-4.428c-0.411-1.473-0.827-2.946-1.248-4.418c-0.422-1.471-0.849-2.941-1.281-4.409\n" +
        "\t\t\tc-0.432-1.469-0.869-2.935-1.311-4.401c-0.086-0.286-0.409-1.549-0.409-1.549l-0.778-2.334c0,0-0.242-0.807-0.288-0.956\n" +
        "\t\t\tc-0.404-1.314-0.812-2.626-1.223-3.937c-0.457-1.46-0.919-2.919-1.382-4.378c-0.464-1.459-0.932-2.916-1.401-4.372\n" +
        "\t\t\tc-0.47-1.456-0.942-2.912-1.417-4.367c-0.475-1.455-0.952-2.909-1.43-4.363c-0.479-1.453-0.959-2.907-1.441-4.359\n" +
        "\t\t\tc-0.481-1.452-0.964-2.904-1.448-4.356c-0.484-1.452-0.968-2.904-1.454-4.355c-0.485-1.452-0.971-2.903-1.457-4.354\n" +
        "\t\t\tc-0.485-1.451-0.971-2.902-1.457-4.353c-0.486-1.452-0.971-2.903-1.454-4.355c-0.483-1.452-0.965-2.905-1.442-4.359\n" +
        "\t\t\tc-0.477-1.454-0.95-2.91-1.42-4.367c-0.47-1.456-0.938-2.913-1.401-4.372c-0.464-1.459-0.925-2.918-1.383-4.378\n" +
        "\t\t\tc-0.458-1.46-0.913-2.922-1.366-4.383c-0.452-1.462-0.902-2.925-1.349-4.388c-0.447-1.463-0.892-2.928-1.334-4.393\n" +
        "\t\t\tc-0.442-1.464-0.882-2.931-1.32-4.398c-0.437-1.466-0.873-2.933-1.306-4.401c-0.433-1.468-0.865-2.936-1.294-4.405\n" +
        "\t\t\tc-0.43-1.469-0.856-2.939-1.282-4.409c-0.426-1.47-0.849-2.941-1.272-4.411c-0.423-1.471-0.843-2.942-1.263-4.414\n" +
        "\t\t\tc-0.42-1.472-0.838-2.944-1.255-4.417c-0.417-1.472-0.832-2.945-1.246-4.419c-0.415-1.473-0.828-2.947-1.24-4.42\n" +
        "\t\t\tc-0.413-1.474-0.824-2.948-1.236-4.422c-0.41-1.475-0.821-2.949-1.23-4.424C0.565,21.613,0,19.475,0,19.475l1.51-8.461L35.962,0\n" +
        "\t\t\tl4.27,6.682c0,0,1.083,3.087,1.572,4.452c0.515,1.438,1.032,2.875,1.55,4.311c0.519,1.436,1.039,2.871,1.562,4.306\n" +
        "\t\t\tc0.523,1.435,1.048,2.869,1.576,4.302c0.528,1.433,1.057,2.866,1.59,4.297c0.532,1.431,1.067,2.861,1.604,4.291\n" +
        "\t\t\tc0.538,1.43,1.078,2.858,1.621,4.285c0.543,1.428,1.089,2.854,1.638,4.279c0.549,1.424,1.102,2.848,1.659,4.27\n" +
        "\t\t\tc0.557,1.422,1.12,2.842,1.686,4.26c0.567,1.418,1.139,2.834,1.716,4.248c0.578,1.414,1.161,2.825,1.751,4.234\n" +
        "\t\t\tc0.59,1.409,1.187,2.814,1.79,4.217c0.605,1.403,1.216,2.802,1.835,4.198c0.619,1.396,1.247,2.788,1.883,4.177\n" +
        "\t\t\tc0.636,1.388,1.281,2.773,1.935,4.152c0.655,1.38,1.319,2.755,1.992,4.125c0.674,1.37,1.359,2.735,2.054,4.095\n" +
        "\t\t\tc0.695,1.359,1.401,2.714,2.117,4.063c0.717,1.348,1.444,2.692,2.183,4.028c0.738,1.336,1.488,2.667,2.248,3.991\n" +
        "\t\t\tc0.761,1.325,1.532,2.643,2.315,3.954c0.587,0.982,1.779,2.935,1.779,2.935l2.066,3.306c0,0,0.657,1.03,0.989,1.544\n" +
        "\t\t\tc0.828,1.282,1.668,2.558,2.531,3.819c4.656,6.814,9.921,13.195,15.016,19.692c0.925,1.179,1.845,2.362,2.783,3.53\n" +
        "\t\t\tc0.939,1.168,1.897,2.321,2.868,3.462c0.97,1.142,1.953,2.272,2.951,3.39c0.997,1.118,2.009,2.224,3.034,3.317\n" +
        "\t\t\tc1.026,1.093,2.065,2.173,3.118,3.239c1.053,1.067,2.12,2.12,3.2,3.158c1.08,1.038,2.174,2.062,3.281,3.072\n" +
        "\t\t\tc1.108,1.01,2.228,2.005,3.362,2.984c1.134,0.979,2.283,1.943,3.444,2.891c1.161,0.947,2.334,1.879,3.521,2.793\n" +
        "\t\t\tc1.187,0.914,2.387,1.812,3.6,2.692c1.213,0.88,2.439,1.743,3.677,2.587c1.238,0.845,2.488,1.671,3.751,2.478\n" +
        "\t\t\tc0.324,0.208,1.03,0.55,1.03,0.55l2.791,1.82c0,0,0.442,0.264,0.662,0.396c1.068,0.634,2.142,1.254,3.224,1.862\n" +
        "\t\t\tc1.306,0.734,2.623,1.45,3.949,2.147c1.326,0.697,2.663,1.376,4.008,2.035c1.346,0.659,2.701,1.3,4.064,1.921\n" +
        "\t\t\tc1.363,0.621,2.736,1.224,4.116,1.807c1.38,0.583,2.769,1.147,4.164,1.692c1.396,0.544,2.8,1.07,4.211,1.576\n" +
        "\t\t\tc1.41,0.506,2.828,0.992,4.252,1.459c1.424,0.467,2.855,0.914,4.291,1.34c1.436,0.427,2.879,0.834,4.327,1.221\n" +
        "\t\t\tc1.448,0.387,2.901,0.753,4.358,1.099c1.458,0.347,2.921,0.673,4.387,0.981c1.466,0.308,2.936,0.598,4.411,0.868\n" +
        "\t\t\tc1.474,0.27,2.952,0.521,4.432,0.752c1.481,0.232,2.964,0.443,4.45,0.634c1.486,0.191,2.975,0.362,4.466,0.514\n" +
        "\t\t\tc1.491,0.152,2.983,0.284,4.478,0.398c1.494,0.114,2.99,0.208,4.486,0.286c1.496,0.078,2.994,0.138,4.492,0.178\n" +
        "\t\t\tc0.349,0.01,1.047,0.026,1.047,0.026l3.317,0.018c0,0,0.917-0.03,1.554-0.048c1.495-0.04,2.99-0.098,4.484-0.174\n" +
        "\t\t\tc1.494-0.076,2.986-0.172,4.478-0.285c1.492-0.113,2.982-0.245,4.47-0.397c1.488-0.151,2.974-0.321,4.458-0.512\n" +
        "\t\t\tc1.483-0.19,2.964-0.401,4.442-0.631c1.478-0.231,2.953-0.481,4.424-0.75c1.471-0.27,2.939-0.558,4.403-0.865\n" +
        "\t\t\tc1.464-0.308,2.924-0.634,4.38-0.978c1.456-0.344,2.907-0.706,4.354-1.086c1.447-0.38,2.888-0.778,4.326-1.193\n" +
        "\t\t\tc1.437-0.415,2.869-0.847,4.296-1.296c1.427-0.45,2.848-0.915,4.264-1.398c1.416-0.482,2.826-0.981,4.23-1.497\n" +
        "\t\t\tc1.404-0.515,2.802-1.047,4.194-1.594c1.392-0.547,2.778-1.111,4.157-1.689c1.379-0.579,2.751-1.174,4.117-1.785\n" +
        "\t\t\tc1.365-0.611,2.723-1.238,4.073-1.881c1.351-0.643,2.694-1.301,4.029-1.975c1.335-0.674,2.663-1.363,3.982-2.069\n" +
        "\t\t\tc0.348-0.186,1.042-0.561,1.042-0.561l2.89-1.602c0,0,0.319-0.181,0.479-0.272c1.14-0.649,2.274-1.311,3.4-1.984\n" +
        "\t\t\tc1.284-0.767,2.559-1.55,3.823-2.348c1.265-0.798,2.521-1.612,3.766-2.44c1.245-0.829,2.48-1.672,3.705-2.531\n" +
        "\t\t\tc1.225-0.859,2.439-1.732,3.642-2.62c1.204-0.888,2.397-1.791,3.58-2.706c1.182-0.917,2.353-1.846,3.515-2.79\n" +
        "\t\t\tc1.161-0.943,2.311-1.899,3.45-2.868c1.139-0.969,2.268-1.951,3.385-2.945c1.118-0.994,2.225-2,3.321-3.018\n" +
        "\t\t\tc1.096-1.018,2.181-2.047,3.255-3.089c1.074-1.04,2.138-2.092,3.19-3.156c1.051-1.064,2.09-2.138,3.124-3.22\n" +
        "\t\t\tc7.535-7.881,14.784-16.066,21.651-24.553c0.035-0.043,0.556-0.645,0.556-0.645l1.702-2.175c0,0,0.386-0.487,0.578-0.731\n" +
        "\t\t\tc4.503-5.709,8.831-11.552,12.957-17.528c0.852-1.233,1.695-2.473,2.528-3.718c0.834-1.246,1.657-2.498,2.473-3.756\n" +
        "\t\t\tc0.815-1.258,1.622-2.521,2.421-3.789c0.798-1.268,1.589-2.541,2.372-3.82c0.783-1.278,1.558-2.561,2.327-3.847\n" +
        "\t\t\tc0.769-1.287,1.531-2.578,2.286-3.872c0.756-1.295,1.505-2.592,2.249-3.893c0.743-1.301,1.482-2.606,2.215-3.913\n" +
        "\t\t\tc0.733-1.307,1.462-2.617,2.186-3.929c0.724-1.313,1.444-2.627,2.161-3.943c0.715-1.316,1.429-2.635,2.139-3.955\n" +
        "\t\t\tc0.71-1.319,1.417-2.641,2.122-3.964c0.705-1.323,1.407-2.647,2.107-3.972c0.7-1.326,1.397-2.652,2.093-3.98\n" +
        "\t\t\tc0.695-1.328,1.388-2.657,2.079-3.986c0.691-1.33,1.379-2.661,2.066-3.994c0.687-1.333,1.372-2.665,2.055-3.999\n" +
        "\t\t\tc0.683-1.334,1.365-2.669,2.045-4.005c0.4-0.786,1.383-2.677,1.383-2.677l6.134-5.077l29.432,20.784l-1.029,8.513\n" +
        "\t\t\tC480.464,41.011,479.668,43.065,479.339,43.887z",
    },
    d_2: {
      d1:
        "M268.982,5.575c44.074,0.126,88.161,0.252,132.235,0.378c17.421,0.547,43.604-2.992,52.539,6.055\n" +
        "\t\t\tc3.765,3.812,2.665,14.473,2.665,21.822c0,18.036,0,36.078,0,54.114c0,17.658,0,35.321,0,52.979\n" +
        "\t\t\tc0,7.591,0.991,17.151-3.299,20.561c-3.443,2.737-7.728,4.129-13.198,4.919c-3.003,0.126-6.007,0.252-9.01,0.378\n" +
        "\t\t\tc-2.242,0-4.484,0-6.726,0c-21.91,0.084-43.827,0.168-65.737,0.252c-6.598,0.042-13.199,0.084-19.797,0.126\n" +
        "\t\t\tc-20.387-0.042-40.781-0.084-61.168-0.126c-12.681,0.914-27.144,0-40.229,0c-8.882-0.042-17.768-0.084-26.65-0.126\n" +
        "\t\t\tc-33.542-0.084-67.094-0.168-100.635-0.252c-12.647,0-25.298,0-37.945,0c-7.046,0-14.83,0.356-21.447-0.252\n" +
        "\t\t\tc-5.118-0.042-10.237-0.084-15.355-0.126c-3.638,0-7.276,0-10.914,0c-7.53-1.068-13.874-1.785-17.005-7.064\n" +
        "\t\t\tc-2.48-4.181-1.396-13.447-1.396-19.678c0-15.009,0-30.023,0-45.032c0-19.676,0-39.358,0-59.033\n" +
        "\t\t\tc0-7.698-1.301-19.449,2.665-23.462c3.249-3.288,7.872-4.509,13.579-5.424c1.903,0,3.807,0,5.711,0\n" +
        "\t\t\tC32.684,6.542,37.508,6.5,42.33,6.458c8.677,0,18.342-0.115,26.523,0.126c19.922-0.21,39.85-0.42,59.772-0.631\n" +
        "\t\t\tc8.798,0,17.598,0,26.396,0c18.23-0.042,36.466-0.084,54.696-0.126C229.47,5.743,249.229,5.659,268.982,5.575z",
      d2: "M0,0h462.373v173.008H0V0z",
      d3: "M5.732,5.732h450.908v161.543H5.732V5.732z",
    },
  };
}
