<?php

namespace Tests\Feature;

use App\Models\Users\Admin;
use App\Models\Users\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @dataProvider allUserTypesProvider
     */
    public function testLoginReturnsAccessAndRefreshTokens($routePrefix, $userClass)
    {
        $user = $userClass::factory()->create();

        // Check that user can't login with wrong credentials
        $response = $this->post(route($routePrefix . '.login'), ['email' => $user->email, 'password' => 'wrong_password1234']);
        $response->assertStatus(422);

        // Check that user successfully logged in
        $response = $this->post(route($routePrefix . '.login'), ['email' => $user->email, 'password' => 'test1234']);
        $response->assertJsonStructure(['access_token', 'refresh_token']);
    }

    /**
     * @dataProvider allUserTypesProvider
     */
    public function testUserCanRefreshToken($routePrefix, $userClass)
    {
        /** @var User */
        $user = $userClass::factory()->create();

        // Logins user to the system to get access_token and refresh_token. After this line user is logged in
        $tokens = $this->postJson(route($routePrefix . '.login'), ['email' => $user->email, 'password' => 'test1234'])->json();

        // Manually logout user
        auth()->logout();

        // FIXME: Check that user can't use refresh_token for authorization
        // Laravel looks for token in query parameters, response body or Authorization header to authenticate user
        // $failedResponseToMe = $this->getJson(route($routePrefix . '.me') . '?token=' . $tokens['refresh_token']);
        // $failedResponseToMe->assertStatus(401);

        // Check that we get new refresh token with valid previous token
        $response = $this->postJson(route($routePrefix . '.refreshToken', ['refresh_token' => $tokens['refresh_token']]));
        $response->assertJsonStructure(['access_token', 'refresh_token']);
    }

    public function testNewClientsCanRegister()
    {
        $response = $this->postJson(route('client.register'), [
            'name' => 'Test name',
            'email' => 'user@wordhunt.com',
            'password' => 'test1234',
        ]);

        $response->assertJsonStructure(['access_token', 'refresh_token']);

        $this->assertDatabaseHas('clients', ['email' => 'user@wordhunt.com']);

        auth()->logout();

        // User tries to register again with same email
        $response = $this->postJson(route('client.register'), [
            'name' => 'Hi',
            'email' => 'user@wordhunt.com',
            'password' => 'test1234_new',
        ]);
        $response->assertStatus(422);
    }

    public function allUserTypesProvider()
    {
        return [
            ['admin', Admin::class],
            ['client', Client::class],
        ];
    }
}
