using UnityEngine;
using System.Collections;

public class Enemy : Ship
{
    private float _movement = 25f;

    void Start()
    {
        StartCoroutine(attack());
    }

    void Update()
    {
        transform.Translate(0, 0, -_movement * Time.deltaTime, Space.World);
        if (transform.position.z < -2)
        {
            Destroy(gameObject);
        }
    }

    void FixedUpdate()
    {
        if (killed)
        {
            rigidbody.AddTorque(Random.Range(-800f, 800f), Random.Range(-800f, 800f), Random.Range(-800f, 800f));
        }
    }

    IEnumerator attack()
    {
        while (!killed)
        {
            fire(gameObject, transform.forward);

            yield return new WaitForSeconds(Random.Range(2f, 3f));
        }
    }

    void OnCollisionEnter(Collision collision)
    {
        if (collision.collider.tag.Equals("Player"))
        {
            collision.collider.gameObject.SendMessage("receive_damage", 2);
            receive_damage(hitpoints + 1);
        }
    }
}
